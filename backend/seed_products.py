from app import create_app, db
from app.models.product import Product

app = create_app()

with app.app_context():

    products = [
        Product(
            name="Performance Exhaust System",
            category="engine",
            price=15000,
            description="High-performance exhaust system for maximum efficiency.",
            image_url="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80"
        ),
        Product(
            name="Body Kit & Spoilers",
            category="exterior",
            price=25000,
            description="Aerodynamic body kits for improved style and stability.",
            image_url="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80"
        ),
        Product(
            name="Premium Seats & Upholstery",
            category="interior",
            price=30000,
            description="Luxury leather seats and custom upholstery.",
            image_url="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80"
        ),
        Product(
            name="LED Lighting Kit",
            category="electronics",
            price=8000,
            description="Ultra bright car LED lighting kit.",
            image_url="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80"
        ),
    ]

    db.session.bulk_save_objects(products)
    db.session.commit()
    print("Dummy products added!")
