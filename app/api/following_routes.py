from flask import Blueprint, jsonify, session, request
from app.models import  User, Following, Follower, db
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages


following_routes = Blueprint('followings', __name__)


#Follow user
@following_routes.route('/<int:id>', methods=['POST'])
def follow_user(id):
    user_followed_query = Following.query.filter(Following.user_id == current_user.id , Following.followed_user_id == id ).one_or_none()

    if user_followed_query : return {'Error': "user is already followed"}

    check_user_exist = User.query.get(id)

    if not check_user_exist: return {"Error": "user does not exist"}

    follow = Following(
        user_id=current_user.id,
        followed_user_id = id
    )

    follower = Follower(
        followed_user_id = id,
        follower_id = current_user.id
    )

    db.session.add(follow)
    db.session.add(follower)
    db.session.commit()
    return  follow.to_dict()

#UNFOLLOW USER
@following_routes.route('/<int:id>', methods=['DELETE'])
def unfollow_user(id):
    user_followed = Following.query.filter(Following.user_id == current_user.id , Following.followed_user_id == id ).one_or_none()
    remove_follower = Follower.query.filter(Follower.followed_user_id == id, Follower.follower_id == current_user.id).one_or_none()

    if not user_followed : return {'Error': "user already not followed"}

    check_user_exist = User.query.get(id)

    if not check_user_exist: return {"Error": "user does not exist"}

    db.session.delete(user_followed)
    db.session.delete(remove_follower)
    db.session.commit()
    return {'Success': 'User unfollowed' }
