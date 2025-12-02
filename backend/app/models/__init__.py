# backend/app/models/__init__.py
from .user import User
from .product import Product
from .contact_requests import ContactRequest
from .portfolio_item import PortfolioItem
from .testimonial import Testimonial

__all__ = [
    "User",
    "Product",
    "ContactRequest",
    "PortfolioItem",
    "Testimonial",
]
