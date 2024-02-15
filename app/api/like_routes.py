from flask import Blueprint, jsonify, session, request
from app.models import Tag, AlbumLikes, db
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('like', __name__)


@like_routes.route('/current')
@login_required
def user_album_likes():
    user = current_user
    likes = AlbumLikes.query.filter(AlbumLikes.user_id == user.id).all()

    return {'likes':[like.album.to_dict() for like in likes ]}
