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

    artist = db.relationship('User', back_populates='albums')
    songs = db.relationship('Song', back_populates='album')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'genre': self.genre,
            'release_date': self.release_date,
            'description': self.descrption,
        }
