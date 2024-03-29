from flask import Blueprint, jsonify, session, request
from app.models import Album, Tag, album_tags, Song, AlbumImage, db
from flask_login import current_user, login_required
from ..forms.create_album import AlbumForm
from ..forms.song_form import SongForm
from ..forms.album_image_form import AlbumImageForm
from ..models.album_likes import AlbumLikes
from .aws_s3 import get_unique_filename, upload_file_to_s3
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

    if(not album): return {'Errors':'Album not Found'}, 404

    album_obj = {
        'details': album.to_dict(),
        'songs': [song.to_dict() for song in album.songs],
        'images': [image.to_dict() for image in album.album_images],
        'artist': album.artist.to_dict()
    }

    return {'album': album_obj}

#QUERY ALBUM BY TAGS
@album_routes.route('/<string:tag>')
def albums_by_tag(tag):
    tag_query = Tag.query.filter(Tag.name == tag).one_or_none()

    print(tag_query.to_dict())

    albums_with_tag = tag_query.albums
    return {'albums': [album.to_dict() for album in albums_with_tag]}

#CREATE ALBUM
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


#ADD SONG TO ALBUM
@album_routes.route('/<int:id>/songs', methods=['POST'])
def post_song_to_album(id):
    album = Album.query.get(id)
    user = current_user

    if not album: return {"Error": "album not found"}

    if user.artist_account and album.artist.id == user.id:
        form = SongForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():

            song_file = form.song_file.data
            song_file.filename = get_unique_filename(song_file.filename)
            upload = upload_file_to_s3(song_file)
            print('UPLOADDD',upload)

            url = upload["url"]

            new_song = Song(
                name = form.name.data,
                album_id = id,
                url = url
            )
            db.session.add(new_song)
            db.session.commit()
            return {"song": new_song.to_dict()}
        else: return {"Errors": validation_errors_to_error_messages(form.errors)}

    else: return {"Error": "User does not have an artist account or dosent own album"}


#ADD ALBUM TO LIKES
@album_routes.route('/<int:album_id>/likes', methods=['POST'])
def add_album_to_likes(album_id):
    album = Album.query.get(album_id)

    if not album: return {"Error","Album not found"}, 404

    like_query = AlbumLikes.query.filter(AlbumLikes.user_id == current_user.id, AlbumLikes.album_id == album_id).one_or_none()

    #Delete like if like is present
    if like_query:
        db.session.delete(like_query)
        db.session.commit()
        return {'Success':"Like Removed"}


    like = AlbumLikes(album_id = album_id, user_id = current_user.id)
    db.session.add(like)
    db.session.commit()
    return {'like': like.to_dict()}


#find Like
@album_routes.route('/<int:album_id>/likes')
def find_album_like(album_id):
    album_like = AlbumLikes.query.filter(AlbumLikes.user_id == current_user.id, AlbumLikes.album_id == album_id).one_or_none()

    if not album_like : return {"Errors": "Like not found"}

    return {'like': album_like.to_dict()}




#ADD ALBUM IMAGE
@album_routes.route('/<int:album_id>/images', methods=['POST'])
def add_image_to_album(album_id):
    album = Album.query.get(album_id)
    user = current_user
    if album.artist.id == user.id:
        form = AlbumImageForm()

        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            image = AlbumImage(
                url = form.url.data,
                album_id = album_id
            )
            db.session.add(image)
            db.session.commit()
            return {"image added": image.to_dict()}
        else: return {"Errors": validation_errors_to_error_messages(form.errors)}

    else: return {"Error": "User does not own album"}



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
    else: return {"Errors":validation_errors_to_error_messages(form.errors)}


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
    return {"album":"Album is Deleted"}
