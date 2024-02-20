from .db import db, environment, SCHEMA, add_prefix_for_prod


class PostImage(db.Model):
    __tablename__ = 'post_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    post_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('posts.id')))
=======
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
    url = db.Column(db.String)

    post = db.relationship('Post', back_populates='post_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }
