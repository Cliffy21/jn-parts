from datetime import datetime
from app.extensions import db, bcrypt

# maybe add convenience:
def is_admin(self):
    return self.role in ("admin", "superadmin")


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default="admin")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password: str):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password: str):
        return bcrypt.check_password_hash(self.password_hash, password)
