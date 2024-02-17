from flask import Blueprint, jsonify, session, request
from app.models import Post, Comment, Community,Like ,community_users, db
from flask_login import current_user, login_required
from ..forms.create_post import Post_Form
from ..forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

posts_routes = Blueprint('posts', __name__)


def validate_user(id):
     #Current User and Current Post
    user = current_user
    post = Post.query.get(id)

    #query join table user and community
    user_in_group = db.session.query(community_users).where(community_users.c.user_id == user.id, community_users.c.community_id == post.community_id).one_or_none()

    #community user owns
    user_owned_community = user.community

    #validate user
    if user_in_group or user_owned_community and user_owned_community[0].id == post.community_id: return True
    else: return False


#-------------------------------------------LIKES-------------------------------------------------------------------

#Like a Post + Delete like
@posts_routes.route('/<int:community_id>/<int:post_id>/likes', methods=['POST','DELETE'])
def like_post(community_id, post_id):

    #Current User and Current Post
    user = current_user
    post = Post.query.get(post_id)


    like_query = Like.query.filter(Like.user_id == user.id, Like.post_id == post.id).one_or_none()

    #Delete like if like is present
    if like_query:
        db.session.delete(like_query)
        db.session.commit()
        return {'Success':"Like Removed"}

    #verify
    if validate_user(post_id):
        like = Like(post_id = post_id, user_id = user.id)
        db.session.add(like)
        db.session.commit()
        return {'like': like.to_dict()}
    else:
        return {"Error": "User has no acess to community"}, 403


#Find out if user liked
@posts_routes.route('/<int:community_id>/<int:post_id>/likes/current')
def find_user_like(community_id, post_id):
    like = Like.query.filter(Like.user_id==current_user.id, Like.post_id==post_id).one_or_none()

    if not like: return {'Errors': "Like not found"}

    return {"like": like.to_dict()}

#--------------------------------COMMENTS-----------------------------------------------------------------


#GET COMMENTS
@posts_routes.route('/<int:community_id>/<int:post_id>/comments')
def get_comments(community_id, post_id):
     #Current User and Current Post
    user = current_user
    post = Post.query.get(post_id)


    if validate_user(post_id):
        return {"comments": [comment.to_dict() for comment in post.comments]}
    else: return {'Error': "User has no acess to community"}



#Post comment
@posts_routes.route('/<int:community_id>/<int:post_id>/comments', methods=['POST'])
def post_comment(community_id, post_id):
     #Current User and Current Post
    user = current_user
    post = Post.query.get(post_id)


    if validate_user(post_id):
        form = CommentForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            comment = Comment(
                user_id = user.id,
                post_id = post.id,
                text = form.text.data
            )

            db.session.add(comment)
            db.session.commit()
            return {'comment': comment.to_dict()}
        else: return {'Error': "User has no acess to community"}


#UPDATE USER COMMENT
@posts_routes.route('/<int:community_id>/<int:post_id>/comments/<int:comment_id>', methods=['PUT'])
def update_comment(community_id, post_id, comment_id):
    user = current_user
    user_comment = Comment.query.get(comment_id)

    print('USER',user_comment)

    if user_comment and validate_user(post_id):
        form = CommentForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            user_comment.text = form.text.data

            db.session.commit()
            return {'comment': user_comment.to_dict()}
        else: return {"Errors": form.errors}

    else: return {"Error": "User has no acess to community"}


#DELETE Comment
@posts_routes.route('/<int:community_id>/<int:post_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(community_id, post_id, comment_id):
    user = current_user
    post = Post.query.get(post_id)
    user_comment = Comment.query.get(comment_id)

    if validate_user(post_id) and user_comment:
        db.session.delete(user_comment)
        db.session.commit()
        return {"id for comment deleted": comment_id}
    else: return {"Error": "User has no acess to community or Comment"}

#----------------------------------POSTS--------------------------------------------------------------------


#GET ALL POSTS FROM COMMUINTY
@posts_routes.route('/<int:community_id>')
def get_community_posts(community_id):
    posts = Post.query.filter(Post.community_id == community_id).all()

    if not posts: return {'Errors': 'No post found in this community'}

    return {'posts': [post.to_dict() for post in posts]}


#GET ONE POST FROM COMMUNITY
@posts_routes.route('/<int:community_id>/<int:post_id>')
def get_post(community_id, post_id):
    post = Post.query.filter(Post.community_id == community_id, Post.id == post_id).one_or_none()

    if not post: return {"Errors": "Post not Found"}, 404

    return {'post': post.to_dict()}


#POST TO COMMUNITY
@posts_routes.route('/<int:community_id>', methods=['POST'])
@login_required
def post_post(community_id):

    community = Community.query.get(community_id)
    if not community : return {"Community dosent exist"}

    user_id = current_user.id
    form = Post_Form()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        post = Post(
            user_id = user_id,
            community_id = community_id,
            text=form.text.data
        )
        db.session.add(post)
        db.session.commit()
        return {'post': post.to_dict()}

    return{'Errors': validation_errors_to_error_messages(form.errors)}




#UPDATE POST
@posts_routes.route('/<int:community_id>/<int:post_id>', methods=['PUT'])
@login_required
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
    return {"Id of post deleted": post_id}
