import { useDispatch, useSelector } from "react-redux";

import './index.css'
import OpenImageButton from "../OpenImageModel/OpenImageModel";
import ImageForm from "../OpenImageModel/imageform";
import { useEffect, useState } from "react";
import fetchGetArtist from '../../../store/artist'
import { useParams } from "react-router-dom";

import { post, postImage } from "./post-utils";

const PostModal = ({ artist }) => {
    const { artistid } = useParams()
    const [imageUrl, setImageUrl] = useState('')
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const communityId = artist.community_id




    const submitPost = async () => {

        const postMade = {
            "text": text,
            "community_id": communityId,
            "user_id": user.id
        }

        await post(dispatch, postMade, communityId)
        setText('')
        if (imageUrl) {

        }

        console.log(post)
    }

    return (
        <div className="post-modal-whole">
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

        </div>
    );
}

export default PostModal;
