from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.user import User
from app.utils.security import admin_required

admin_users_bp = Blueprint("admin_users", __name__)

@admin_users_bp.get("/users")
@admin_required
def list_users():
    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "email": u.email,
            "role": u.role,
            "created_at": u.created_at.isoformat(),
        }
        for u in users
    ])

@admin_users_bp.post("/users")
@admin_required
def create_user():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    role = data.get("role", "admin")

    if not email or not password:
        return {"message": "Email and password required"}, 400

    if User.query.filter_by(email=email).first():
        return {"message": "User already exists"}, 400

    user = User(email=email, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return {"id": user.id}, 201
