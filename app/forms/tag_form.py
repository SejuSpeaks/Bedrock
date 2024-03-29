from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired


class TagForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
