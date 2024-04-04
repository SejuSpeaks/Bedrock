import { useDispatch, useSelector } from "react-redux"
import { fetchDeletePost } from "../../../../store/posts"
import { useModal } from "../../../../context/Modal";
import { useHistory } from "react-router-dom";

import './index.css'

const DeletePost = ({ post }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory();

    const artist = useSelector(state => state.artist)

    const deletePost = (e) => {
        e.preventDefault()
        dispatch(fetchDeletePost(artist.community_id, post.id))
            .then(closeModal)
            .then(history.push(`/artists/${artist.id}/community`))

    }

    return (
        <div className="update-post-modal-container">
            <div className="delete-post-heading-container">
                <p>Delete Post</p>
            </div>

            <div className="delete-post-buttons-container">
                <button className="delete-post-buttons-delete" onClick={(e) => deletePost(e)}>Yes Delete</button>
                <button className="delete-post-buttons-keep" onClick={closeModal}>No Keep</button>
            </div>

        </div>
    )
}

export default DeletePost
