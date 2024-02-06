from .db import db, environment, SCHEMA, add_prefix_for_prod


class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('posts.id')))
    url = db.Column(db.String)

    post = db.relationship('Post', back_populates='post_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }
