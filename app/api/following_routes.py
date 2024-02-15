from flask import Blueprint, jsonify, session, request
from app.models import  User, Following, Follower, db
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages


following_routes = Blueprint('followings', __name__)


#Get Followers
@following_routes.route('/')
def get_followers():
    user = current_user

    return {
        'followers': [follower.to_dict() for follower in user.followers]}


#Check Following status
@following_routes.route('/<int:id>')
@login_required
def check_following_status(id):

    user_followed = Following.query.filter(Following.user_id == current_user.id, Following.followed_user_id == id).one_or_none()

    if not user_followed: return  {'Errors': "user dosent follow artist"}, 404

    return user_followed.to_dict()




#Follow user
@following_routes.route('/<int:id>', methods=['POST'])
def follow_user(id):
    user_followed_query = Following.query.filter(Following.user_id == current_user.id , Following.followed_user_id == id ).one_or_none()

    if user_followed_query :
        remove_follow = Follower.query.filter(Follower.user_id == current_user.id, Follower.follower_id == id).one_or_none()
        db.session.delete(user_followed_query)
        db.session.delete(remove_follow)
        db.session.commit()
        return {'Success': "user unfollowed"}

    check_user_exist = User.query.get(id)

    if not check_user_exist: return {"Errors": "user does not exist"}

    follow = Following(
        user_id=current_user.id,
        followed_user_id = id
    )

    follower = Follower(
        user_id = current_user.id,
        follower_id = id
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

    if not user_followed : return {'Errors': "user already not followed"}

    check_user_exist = User.query.get(id)

    if not check_user_exist: return {"Errors": "user does not exist"}

    db.session.delete(user_followed)
    db.session.delete(remove_follower)
    db.session.commit()
    return {'Success': 'User unfollowed' }
