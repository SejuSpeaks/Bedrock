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
    const [isLoaded, setIsLoaded] = useState(false);
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const communityId = artist.community_id


    const userValidation = () => {
        if (!user) return false;
        if (artist.community_id === user.community_id || isFollowing) return true
        else return false;
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
                if (imageUrl) {

                    const image = {
                        url: imageUrl
                    }

                    postImage(communityId, res.id, image)
                }

            })
            .then(() => setImageUrl(''))
            .then(() => setIsPosted(true))

    }

    return (
        <div className="post-modal-whole">
            {user && userValidation() && (<>
                <div>
                    <img className="post-profile-picture" src={user.profile_picture} />
                </div>

                <div>
                    <input value={text} onChange={(e) => setText(e.target.value)} className="post-input" placeholder="What is happening?!"></input>
                </div>

                <div>
                    <img src={imageUrl} />
                </div>

                <div className="post-action-buttons-2">
                    <OpenImageButton modalComponent={<ImageForm setImageUrl={setImageUrl} />} />
                    <button onClick={(e) => submitPost()} className="post-button">Post</button>
                </div>

            </>)}
        </div>
    );
}

export default PostModal;
