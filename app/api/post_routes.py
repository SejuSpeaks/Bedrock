from flask import Blueprint, jsonify, session, request
from app.models import Post, Community, db
from flask_login import current_user, login_required
from ..forms.create_post import Post_Form
from .auth_routes import validation_errors_to_error_messages

posts_routes = Blueprint('posts', __name__)


#GET ONE POST FROM COMMUNITY
@posts_routes.route('/<int:community_id>/<int:post_id>')
def get_post(community_id, post_id):
    post = Post.query.filter(Post.community_id == community_id, Post.id == post_id).one_or_none()

    if not post: return {"Errors": "Post not Found"}, 401

    return {'post': post.to_dict()}


#GET ALL POSTS FROM COMMUINTY
@posts_routes.route('/<int:id>')
def get_community_posts(id):
    posts = Post.query.filter(Post.community_id == id).all()

    if not posts: return {'Errors': 'No post found in this community'}

    return {'posts': [post.to_dict() for post in posts]}


#POST TO COMMUNITY
@posts_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_post(id):

    community = Community.query.get(id)
    if not community : return {"Community dosent exist"}

    user_id = current_user.id
    form = Post_Form()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        post = Post(
            user_id = user_id,
            community_id = id,
            text=form.text.data
        )
        db.session.add(post)
        db.session.commit()
        return {'post': post.to_dict()}

    return{'Errors': validation_errors_to_error_messages(form.errors)}


#UPDATE POST
@posts_routes.route('/<int:community_id>/<int:post_id>', methods=['PUT'])
def update_post(community_id, post_id):
    user_id = current_user.id
    post = Post.query.filter(Post.community_id == community_id, Post.id == post_id).one_or_none()

    if not post: return {"Error": 'Post not found'}
    if user_id != post.user_id: return {"Error":"User does not own post"}

    form = Post_Form()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.text = form.text.data
        db.session.commit()
        return {"post": post.to_dict()}

    return {"Errors":validation_errors_to_error_messages(form.errors)}


#DELETE POST
@posts_routes.route('/<int:community_id>/<int:post_id>', methods=['DELETE'])
def delete_post(community_id, post_id):
    user_id = current_user.id
    post = Post.query.filter(Post.community_id == community_id, Post.id == post_id).one_or_none()

    if user_id != post.user_id : return {"Errors": "Current post does not belong to user"}

    db.session.delete(post)
    db.session.commit()
    return {"Success": "post deleted"}
