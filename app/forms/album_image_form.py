from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length

class AlbumImageForm(FlaskForm):
    url = StringField("url", validators=[DataRequired()])
