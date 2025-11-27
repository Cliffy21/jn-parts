from app import create_app, db
from app.extensions import migrate

app = create_app()
migrate.init_app(app, db)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
