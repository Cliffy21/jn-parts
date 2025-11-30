# app/routes/admin_testimonials.py
from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.testimonial import Testimonial
from app.utils.security import admin_required

admin_testimonials_bp = Blueprint("admin_testimonials", __name__)

@admin_testimonials_bp.get("/testimonials")
@admin_required
def list_testimonials():
    items = Testimonial.query.order_by(Testimonial.created_at.desc()).all()
    return jsonify([
        {
            "id": t.id,
            "name": t.name,
            "location": t.location,
            "rating": t.rating,
            "message": t.message,
            "created_at": t.created_at.isoformat(),
        }
        for t in items
    ])

@admin_testimonials_bp.post("/testimonials")
@admin_required
def create_testimonial():
    data = request.get_json() or {}
    t = Testimonial(
        name=data.get("name"),
        location=data.get("location"),
        rating=data.get("rating", 5),
        message=data.get("message"),
    )
    db.session.add(t)
    db.session.commit()
    return {"id": t.id}, 201

@admin_testimonials_bp.put("/testimonials/<int:testimonial_id>")
@admin_required
def update_testimonial(testimonial_id):
    t = Testimonial.query.get_or_404(testimonial_id)
    data = request.get_json() or {}
    for field in ["name", "location", "rating", "message"]:
        if field in data:
            setattr(t, field, data[field])
    db.session.commit()
    return {"message": "Updated"}, 200

@admin_testimonials_bp.delete("/testimonials/<int:testimonial_id>")
@admin_required
def delete_testimonial(testimonial_id):
    t = Testimonial.query.get_or_404(testimonial_id)
    db.session.delete(t)
    db.session.commit()
    return {"message": "Deleted"}, 200
