from flask import Blueprint, jsonify, session, request
from app.models import Album, Tag, db
from flask_login import current_user, login_required
from ..forms.create_album import AlbumForm
from .auth_routes import validation_errors_to_error_messages

album_routes = Blueprint('albums', __name__)

#QUERY ALL ALBUMS
@album_routes.route('/')
def allAlbums():
    albums = Album.query.all()
    return {'albums': [album.to_dict() for album in albums]}

#QUERY ALBUM BY ID
@album_routes.route('/<int:id>')
def album_by_id(id):
    album = Album.query.get(id)

    if(not album): return 'Album not Found', 401

    return {'album': album.to_dict()}

#QUERY ALBUM BY TAGS
@album_routes.route('/<string:tag>')
def albums_by_tag(tag):
    tag_query = Tag.query.filter(Tag.name == tag).one()

    albums = tag_query.albums
    print(albums)
    return {'albums': [album.to_dict() for album in albums]}

#POST ALBUM
@album_routes.route('/', methods=['POST'])
@login_required
def post_album():
    userid = current_user.id

    if not current_user.artist_account: return "Only Artist accounts can post albums", 403

    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        album = Album(
            title = form.title.data,
            cover = form.cover.data,
            genre = form.genre.data,
            artist_id = userid,
            release_date = form.release_date.data,
            description = form.description.data
        )
        db.session.add(album)
        db.session.commit()
        return {'album': album.to_dict()}
    return{'Errors': validation_errors_to_error_messages(form.errors)}

#UPDATE ALBUM
@album_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_album(id):
    user_id = current_user.id
    album = Album.query.get(id)

    if user_id != album.artist_id:
        return {'Error': "user must own album"}, 403

    form = AlbumForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        album.title = form.title.data
        album.genre = form.genre.data
        album.description = form.description.data
        album.release_date = form.release_date.data
        album.cover = form.cover.data

        db.session.commit()
        return {'album': album.to_dict()}


#DELETE ALBUM
@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
    user_id = current_user.id
    album = Album.query.get(id)

    if user_id != album.artist_id:
        return {'Error': "user must own album"}, 403

    db.session.delete(album)
    db.session.commit()
    return "Album is Deleted"
