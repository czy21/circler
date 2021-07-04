from src.app import app
from src.view import user as user_view

if __name__ == '__main__':
    app.run(debug=True, port=8080)
