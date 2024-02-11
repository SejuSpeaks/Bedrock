from flask import Blueprint, jsonify, session, request
from app.models import Tag, Album, album_tags, db
from ..forms.tag_form import TagForm
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

tag_routes = Blueprint('tags', __name__)

#Get all Tags
@tag_routes.route('/')
def get_all_tags():
    tags = Tag.query.limit(10).all()
    return {"tags":[tag.to_dict() for tag in tags]}

#Add Tag to Album
@tag_routes.route('/<int:albumid>', methods=['POST'])
def add_tag_to_album(albumid):
    album = Album.query.get(albumid)
    user = current_user

    if not album: return {"Errors": "Album not Found"}, 404

    if album.artist.id != user.id: return {"Errors": "User dosent own album"}, 401

    form = TagForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        tag_exists = Tag.query.filter(Tag.name == form.name.data).one_or_none()
        if tag_exists :

            stmt = db.select([album_tags]).where((album_tags.c.album_id == albumid) & (album_tags.c.tag_id == tag_exists.id))
            existing_album_tag = db.session.execute(stmt).fetchone()

            if existing_album_tag:
                return {"Errors": "Tag already associated with the album"}, 400



            album_tag = album_tags.insert().values(album_id=albumid, tag_id = tag_exists.id)
            db.session.execute(album_tag)
            db.session.commit()
        else:
            tag = Tag(
            name = form.name.data
             )
            db.session.add(tag)
            db.session.commit()

            album_tag = album_tags.insert().values(album_id=albumid, tag_id = tag.id)
            db.session.execute(album_tag)
            db.session.commit()

        return tag.to_dict()
    else: return validation_errors_to_error_messages(form.errors)

#Delete Tag from ALbum
@tag_routes.route('/<int:albumid>/<int:tagid>', methods=['DELETE'])
def delete_tag(albumid,tagid):
    tag = Tag.query.get(tagid)
    album = Album.query.get(albumid)
    user = current_user

    if album.artist.id != user.id : return {"Errors":"album dosent belong to user"}, 401
    if not tag: return {"Errors":"Tag dosent exist"}, 404

    db.session.delete(tag)
    db.session.commit()

    return {"Success": "Tag deleted"}
