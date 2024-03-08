from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def is_artist_account(form,field):
    artist_account = form.artist_account.data
    artist_name = field.data
    if artist_account and not artist_name:
        raise ValidationError('If Artist Account must have artist name')

    if not artist_account and artist_name:
        raise ValidationError('Must be Artist Account to have Name')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    artist_account = BooleanField('artist_account')
    bio = StringField('bio')
    at = StringField('at', validators=[DataRequired()])
    header = StringField('header')
    city = StringField('city')
    profile_picture = StringField('prof_pic', validators=[DataRequired()])
    artist_name = StringField('artist_name', validators=[is_artist_account])
    password = StringField('password', validators=[DataRequired()])
