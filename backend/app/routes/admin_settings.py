from flask import Blueprint, jsonify
from app.utils.security import admin_required

admin_settings_bp = Blueprint("admin_settings", __name__)

@admin_settings_bp.get("/settings")
@admin_required
def get_settings():
    return jsonify({
        "site_name": "JN Parts & Accessories",
        "version": "1.0.0",
        "maintenance_mode": False
    })
