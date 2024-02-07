from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length

class SongForm(FlaskForm):
    url = StringField("url", validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
