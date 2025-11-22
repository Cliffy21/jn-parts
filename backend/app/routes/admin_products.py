from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.product import Product
from app.utils.security import admin_required

admin_products_bp = Blueprint("admin_products", __name__)


@admin_products_bp.get("/products")
@admin_required
def admin_list_products():
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


@admin_products_bp.post("/products")
@admin_required
def admin_create_product():
    data = request.get_json() or {}

    if not data.get("name"):
        return {"message": "Product name is required"}, 400

    product = Product(
        name=data["name"],
        category=data.get("category"),
        price=data.get("price", 0),
        description=data.get("description"),
        image_url=data.get("image_url"),
    )
    db.session.add(product)
    db.session.commit()

    return {"id": product.id}, 201


@admin_products_bp.put("/products/<int:product_id>")
@admin_required
def admin_update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json() or {}

    for field in ["name", "category", "price", "description", "image_url"]:
        if field in data:
            setattr(product, field, data[field])

    db.session.commit()
    return {"message": "Product updated"}, 200


@admin_products_bp.delete("/products/<int:product_id>")
@admin_required
def admin_delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return {"message": "Product deleted"}, 200
