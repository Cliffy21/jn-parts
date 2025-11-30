from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.product import Product
from app.models.contact import ContactRequest

public_bp = Blueprint("public", __name__)


@public_bp.get("/api/products")
def get_products():
    """Public endpoint for Next.js customer site."""
    products = Product.query.order_by(Product.created_at.desc()).all()
    return jsonify([
        {
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "price": str(p.price) if p.price is not None else None,
            "description": p.description,
            "image_url": p.image_url,
        }
        for p in products
    ])
# app/routes/public.py
@public_bp.get("/api/testimonials")
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


@public_bp.post("/api/contact")
def create_contact_request():
    """Customer contact / quote request."""
    data = request.get_json() or {}

    contact = ContactRequest(
        name=data.get("name"),
        email=data.get("email"),
        phone=data.get("phone"),
        vehicle_model=data.get("vehicle_model"),
        message=data.get("message"),
    )
    db.session.add(contact)
    db.session.commit()

    return {"message": "Contact request submitted"}, 201
