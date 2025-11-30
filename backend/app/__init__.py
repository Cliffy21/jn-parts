import os
from flask import Flask
from .config import DevelopmentConfig, ProductionConfig
from .extensions import db, jwt, bcrypt, migrate
from .routes.public import public_bp
from .routes.admin_auth import admin_auth_bp
from .routes.admin_products import admin_products_bp
from .routes.admin_contact import admin_contact_bp
from .routes.admin_users import admin_users_bp

from flask_cors import CORS

def create_app():
    env = os.getenv("FLASK_ENV", "development")
    config_class = DevelopmentConfig if env == "development" else ProductionConfig

    app = Flask(__name__)
    app.config.from_object(config_class)

    # Init extensions
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    # Import models so migrations detect them
    from . import models

    # Register routes
    app.register_blueprint(public_bp)
    app.register_blueprint(admin_auth_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_products_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_contact_bp, url_prefix="/admin/api")
    app.register_blueprint(admin_users_bp, url_prefix="/admin/api")
    
    # Health check
    @app.get("/health")
    def health():
        return {"status": "ok", "env": env}, 200
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True,
    )

    return app
