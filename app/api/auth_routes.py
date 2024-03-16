from flask import Blueprint, jsonify, session, request
from app.models import User, db, Community
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """

    user_community = current_user.community[0].id if current_user.community else "no community"

    if current_user.is_authenticated:
        user = {
            "id": current_user.id,
            "artist_account": current_user.artist_account,
            "artist_name": current_user.artist_name,
            "bio": current_user.bio,
            "at": current_user.at,
            "header":current_user.header,
            "city":current_user.city,
            "community_id": user_community,
            "email": current_user.email,
            "profile_picture": current_user.profile_picture,
            "username": current_user.username,
            "albums": [album.to_dict() for album in current_user.albums]
        }
        return user
        # return {'info': current_user.to_dict(), 'albums': [album.to_dict() for album in current_user.albums]}
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        artist_name = None
        if form['artist_name'].data : artist_name = form['artist_name'].data

        user = User(
            username=form['username'].data,
            email=form['email'].data,
            password=form['password'].data,
            at = form['at'].data,
            header = form['header'].data,
            city = form['city'].data,
            profile_picture=form['profile_picture'].data,
            bio=form['bio'].data,
            artist_account=form['artist_account'].data,
            artist_name=artist_name
        )


        db.session.add(user)
        db.session.commit()

        community = None

        if form['artist_account'].data :
            community = Community(artist_id=user.id)
            db.session.add(community)
            db.session.commit()

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
