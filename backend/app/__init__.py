import os
from flask import Flask, jsonify
from .config import DevelopmentConfig, ProductionConfig
from .extensions import db, jwt, bcrypt, migrate
from .routes.public import public_bp
from .routes import register_routes
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

    # Custom JWT error handlers (return 401 instead of 422 for clarity)
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        """Handle invalid/malformed JWT tokens"""
        return (
            jsonify({"msg": "Invalid token: " + str(error)}),
            401,
        )

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        """Handle missing JWT token"""
        return (
            jsonify({"msg": "Missing Authorization Header"}),
            401,
        )

    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_data):
        """Handle expired JWT tokens"""
        return (
            jsonify({"msg": "Token has expired"}),
            401,
        )

    @jwt.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_data):
        """Handle revoked JWT tokens"""
        return (
            jsonify({"msg": "Token has been revoked"}),
            401,
        )

    # Import models so migrations detect them
    from . import models

    # Register routes (centralized)
    register_routes(app)

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
