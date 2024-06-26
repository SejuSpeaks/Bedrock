import boto3
import botocore
import os
import uuid

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)


ALLOWED_EXTENSIONS = {"mp3","wav"}
ALLOWED_IMAGE_EXTENSIONS = {"png", "jpeg"}
BUCKET_NAME = os.environ.get("S3_SONG_BUCKET")
IMAGE_BUCKET = os.environ.get("S3_IMAGE_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
S3_IMAGE_LOCATION =f"https://{IMAGE_BUCKET}.s3.amazonaws.com/"

def get_unique_filename(filename):
    ext = filename.rsplit('.', 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"



def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        #in case upload fails
        return {"errors": str(e)}
    return {'url': f"{S3_LOCATION}{file.filename}"}



def remove_file_from_s3(song_url):
    # AWS needs the song file name, not the URL,
    # so we split that out of the URL
    key = song_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True

#IMAGE BUCKET

def upload_image_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            IMAGE_BUCKET,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        #in case upload fails
        return {"errors": str(e)}
    return {'url': f"{S3_IMAGE_LOCATION}{file.filename}"}


def remove_image_file_from_s3(file):
    key = file.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=IMAGE_BUCKET,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
