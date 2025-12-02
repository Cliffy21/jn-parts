from flask import Blueprint, jsonify
from app.models.product import Product
from app.models.testimonial import Testimonial
from app.models.portfolio_item import PortfolioItem
from app.models.contact_requests import ContactRequest
from app.models.user import User
from app.utils.security import admin_required

admin_overview_bp = Blueprint("admin_overview", __name__)

@admin_overview_bp.get("/overview")
@admin_required
def overview():
    return jsonify({
        "products": Product.query.count(),
        "contacts": ContactRequest.query.count(),
        "testimonials": Testimonial.query.count(),
        "portfolio": PortfolioItem.query.count(),
        "admins": User.query.count(),
    })
