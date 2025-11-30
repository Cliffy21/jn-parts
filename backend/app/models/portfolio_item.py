from datetime import datetime
from app.extensions import db

class PortfolioItem(db.Model):
    __tablename__ = "portfolio_items"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    tag = db.Column(db.String(100))  # e.g. "Matte red wrap"
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
