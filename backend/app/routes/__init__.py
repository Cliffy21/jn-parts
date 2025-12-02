from .public import public_bp
from .admin_auth import admin_auth_bp
from .admin_products import admin_products_bp
from .admin_testimonials import admin_testimonials_bp
from .admin_portfolio import admin_portfolio_bp
from .admin_contact_requests import admin_contact_bp
from .admin_users import admin_users_bp
from .admin_overview import admin_overview_bp
from .admin_settings import admin_settings_bp

def register_routes(app):
    # Public API
    app.register_blueprint(public_bp, url_prefix="/api")

    # Admin API
    app.register_blueprint(admin_auth_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_products_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_testimonials_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_portfolio_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_contact_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_users_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_overview_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_settings_bp, url_prefix="/admin/api")

    return app
