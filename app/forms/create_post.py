from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length

class Post_Form(FlaskForm):
    text = StringField("Text", validators=[DataRequired(message="No empty posts please :) ")])
