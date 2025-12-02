from flask import Blueprint, jsonify
from app.models.product import Product
from app.models.testimonial import Testimonial
from app.models.portfolio_item import PortfolioItem

public_bp = Blueprint("public", __name__)

# Public: Get products
@public_bp.get("/products")
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "price": p.price,
            "category": p.category,
            "description": p.description,
            "image_url": p.image_url,
        }
        for p in products
    ])

# Public: Get testimonials
@public_bp.get("/testimonials")
def get_testimonials():
    items = Testimonial.query.order_by(Testimonial.created_at.desc()).all()
    return jsonify([
        {
            "id": t.id,
            "name": t.name,
            "location": t.location,
            "rating": t.rating,
            "message": t.message,
        }
        for t in items
    ])

# Public: Get portfolio items
@public_bp.get("/portfolio")
def get_portfolio():
    items = PortfolioItem.query.order_by(PortfolioItem.created_at.desc()).all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "tag": p.tag,
            "description": p.description,
            "image_url": p.image_url,
        }
        for p in items
    ])
