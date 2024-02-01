from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('users.id')))
    community_id = db.Column(db.Integer, add_prefix_for_prod(db.ForeignKey('communities.id')))
    text = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'post_owner': self.user_id,
            'text': self.text,
        }
