import { useState } from "react";
import { fetchUpdatePost } from "../../../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";

import './index.css';

const UpdatePost = ({ post, setChanged }) => {
    const { closeModal } = useModal()
    const [text, setText] = useState(post.text)
    const artist = useSelector(state => state.artist)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const postUpdated = (e) => {
        e.preventDefault()
        const updatedPost = {
            "user_id": user.id,
            "post_id": post.id,
            "text": text
        }
        dispatch(fetchUpdatePost(artist.community_id, post.id, updatedPost))
        setChanged(true)
        closeModal()
    }

    return (
        <div className="update-post-modal-container">

            <div className="picture-and-at-container">
                <div className="post-details-profile-picture-container">
                    <img className='post-profile-picture' src={user.profile_picture} />
                </div>
                <div>
                    <p>{user.username}</p>
                    <p className="user_at">@{user.at}</p>
                </div>
            </div>

            <div>
                <form className="update-post-form" onSubmit={(e) => postUpdated(e)}>
                    <input className="input-field" value={text} onChange={(e) => setText(e.target.value)}></input>
                    <button className="update-post-button">Update Post</button>
                </form>
            </div>

        </div>
    );
}

export default UpdatePost;
