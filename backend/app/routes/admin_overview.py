from flask import Blueprint, jsonify
from app.models.product import Product
from app.models.contact import ContactRequest
from app.models.user import User
from app.utils.security import admin_required

admin_overview_bp = Blueprint("admin_overview", __name__)

@admin_overview_bp.get("/overview")
@admin_required
def overview():
    product_count = Product.query.count()
    contact_count = ContactRequest.query.count()
    admin_count = User.query.count()

    return {
        "products": product_count,
        "contacts": contact_count,
        "admins": admin_count,
    }
