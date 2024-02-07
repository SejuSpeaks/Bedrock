from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Length
from ..api.aws_s3 import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    song_file = FileField("url", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    name = StringField('name', validators=[DataRequired()])
