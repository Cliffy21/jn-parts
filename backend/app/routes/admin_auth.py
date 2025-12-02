from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user import User

admin_auth_bp = Blueprint("admin_auth", __name__)

@admin_auth_bp.post("/login")
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={"role": user.role},
    )
    return {"access_token": token}
