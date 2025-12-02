from flask import Blueprint, request, jsonify
from app.models.portfolio_item import PortfolioItem
from app.extensions import db
from app.utils.security import admin_required

admin_portfolio_bp = Blueprint("admin_portfolio", __name__)

@admin_portfolio_bp.get("/portfolio")
@admin_required
def list_portfolio():
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

@admin_portfolio_bp.post("/portfolio")
@admin_required
def create_portfolio():
    data = request.get_json() or {}
    p = PortfolioItem(
        title=data.get("title"),
        tag=data.get("tag"),
        description=data.get("description"),
        image_url=data.get("image_url")
    )
    db.session.add(p)
    db.session.commit()
    return {"id": p.id}, 201

@admin_portfolio_bp.put("/portfolio/<int:id>")
@admin_required
def update_portfolio(id):
    p = PortfolioItem.query.get_or_404(id)
    data = request.get_json() or {}
    for field in ["title", "tag", "description", "image_url"]:
        if field in data:
            setattr(p, field, data[field])
    db.session.commit()
    return {"message": "Updated"}, 200

@admin_portfolio_bp.delete("/portfolio/<int:id>")
@admin_required
def delete_portfolio(id):
    p = PortfolioItem.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return {"message": "Deleted"}, 200
