from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.contact import ContactRequest
from app.utils.security import admin_required

admin_contact_bp = Blueprint("admin_contact", __name__)


@admin_contact_bp.get("/contact-requests")
@admin_required
def list_contact_requests():
    items = ContactRequest.query.order_by(ContactRequest.created_at.desc()).all()
    return jsonify([
        {
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "phone": c.phone,
            "vehicle_model": c.vehicle_model,
            "message": c.message,
            "created_at": c.created_at.isoformat(),
            "handled": c.handled,
        }
        for c in items
    ])


@admin_contact_bp.post("/contact-requests/<int:contact_id>/mark-handled")
@admin_required
def mark_contact_handled(contact_id):
    contact = ContactRequest.query.get_or_404(contact_id)
    data = request.get_json() or {}
    handled = data.get("handled", True)
    contact.handled = bool(handled)
    db.session.commit()
    return {"message": "Updated"}, 200
