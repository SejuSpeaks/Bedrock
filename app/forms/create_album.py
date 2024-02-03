from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length

class AlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message="Title is required"), Length(min=5, max=30, message="Title must be 5-30 characters.")])
    cover = StringField("Album Image", validators=[DataRequired(message="Album Image is required")])
    genre = StringField("Genre", validators=[DataRequired(message="Genre is required")])
    release_date = DateField("Release Date", validators=[DataRequired(message="Release Date is required")])
    description = StringField("Description", validators=[DataRequired(message="Description is required")])
