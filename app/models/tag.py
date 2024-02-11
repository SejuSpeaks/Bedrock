from .db import db, environment, SCHEMA, add_prefix_for_prod



album_tags = db.Table(
    'album_tags',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('album_id', db.Integer, add_prefix_for_prod(db.ForeignKey('albums.id'))),
    db.Column('tag_id', db.Integer, add_prefix_for_prod(db.ForeignKey('tags.id')))

)


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    albums = db.relationship('Album', secondary=album_tags, back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
