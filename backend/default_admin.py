import os
from dotenv import load_dotenv

from app import create_app
from app.extensions import db
from app.models.user import User

load_dotenv()

app = create_app()


def create_admin():
    email = os.getenv("ADMIN_DEFAULT_EMAIL", "josephmairu@gmail.com").lower()
    password = os.getenv("ADMIN_DEFAULT_PASSWORD", "JoseMairu28")

    with app.app_context():
        existing = User.query.filter_by(email=email).first()
        if existing:
            print(f"[INFO] Admin user already exists: {email}")
            return

        user = User(email=email, role="admin")
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        print(f"[OK] Created admin user {email} with password {password}")


if __name__ == "__main__":
    create_admin()
