import { useDispatch, useSelector } from "react-redux";

import './index.css'
import OpenImageButton from "../OpenImageModel/OpenImageModel";
import ImageForm from "../OpenImageModel/imageform";
import { useEffect, useState } from "react";
import fetchGetArtist from '../../../store/artist'
import { useParams } from "react-router-dom";

import { post, postImage } from "./post-utils";

const PostModal = ({ artist, setIsPosted, isFollowing }) => {
    const { artistid } = useParams()
    const [imageUrl, setImageUrl] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [canPost, setCanPost] = useState(false);
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const communityId = artist.community_id
    const reader = new FileReader();
    let imagePreview;


    useEffect(() => {
        if (text.length > 0) {
            setCanPost(true)
        }
        else {
            setCanPost(false)
        }

    }, [text])
    const userValidation = () => {
        if (!user) return false;
        if (artist.community_id === user.community_id || isFollowing) return true
        else return false;
    }

    const imageProcess = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        reader.onload = (e) => {
            const url = e.target.result
            setImageUrl(url)

        }
        reader.readAsDataURL(file)
    }

    const deleteImage = () => {
        setImageFile(null)
        setImageUrl("")
        return
    }

    const submitPost = async () => {

        const postMade = {
            "text": text,
            "community_id": communityId,
            "user_id": user.id
        }

        setText('')

        post(dispatch, postMade, communityId)
            .then((res) => {
                if (imageFile) {

                    const image = {
                        file: imageFile
                    }

                    postImage(communityId, res.id, image, setIsPosted)
                }
                else {
                    setIsPosted(true)
                }

            })
            .then(() => setImageUrl(''))
            .then(() => setImageFile(null))

    }

    const showImageDelete = `delete-image` + (imageFile ? "active" : "")
    const showImageContainer = `image-preview-container` + (imageFile ? "" : "disabled")

    return (
        <div>
            {user && userValidation() && (<>
                <div className="post-modal-whole">
                    <div className="post-modal-header">
                        <div>
                            <img className="post-profile-picture" src={user.profile_picture} />
                        </div>

                        <div>
                            <input value={text} onChange={(e) => setText(e.target.value)} className="post-input" placeholder="What is happening?!"></input>
                        </div>
                    </div>

                    <div className={showImageContainer}>

                        <div className={`outer-container-for-x-button`} onClick={() => deleteImage()}>

                            <div className={`${showImageDelete} inner-container-for-x-button`}>
                                <i className={`fa-solid fa-x`} style={{ color: "#ffffff" }}></i>
                            </div>

                        </div>

                        <img className="image-preview" src={imageUrl} />
                    </div>

                    <div className="post-action-buttons-2">
                        <div className="image-upload-container">
                            <label className="upload-image-svg" for="image" > <i class="fa-regular fa-image" style={{ color: "#4c72e7" }}></i> </label>
                            <input id="image" type="file" accept="png/*" onChange={(e) => imageProcess(e)} />
                        </div>
                        {/* <OpenImageButton modalComponent={<ImageForm setImageUrl={setImageUrl} />} /> */}
                        <button onClick={(e) => submitPost()} className={!canPost ? "no-post-button" : "post-button"}>Post</button>
                    </div>

                </div>
            </>)}
        </div>
    );
}

export default PostModal;
