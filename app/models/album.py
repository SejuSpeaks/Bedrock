from .db import db, environment, SCHEMA, add_prefix_for_prod


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    cover = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(255))
    artist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    album_images = db.relationship('AlbumImage', back_populates='album')
    likes = db.relationship('AlbumLikes', back_populates='album')
    artist = db.relationship('User', back_populates='albums')
    songs = db.relationship('Song', back_populates='album')
    tags = db.relationship("Tag", secondary="album_tags", back_populates="albums", cascade='delete')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'genre': self.genre,
            'artist_username': self.artist.artist_name,
            'likes': len(self.likes),
            'songs': [song.to_dict() for song in self.songs],
            'artist_id': self.artist.id,
            'release_date': self.release_date,
            'description': self.description,
        }
