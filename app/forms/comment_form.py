from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    text = StringField("Text", validators=[DataRequired(message="No empty posts please :) ")])
