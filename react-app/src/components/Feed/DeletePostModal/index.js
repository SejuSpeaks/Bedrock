import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDeletePost } from "../../../store/posts"
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";


const DeletePost = ({ post_id, setPostDeleted }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const artist = useSelector(state => state.artist)
<<<<<<< HEAD
    console.log(artist)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

    const deletePost = (e) => {
        e.preventDefault()
        dispatch(fetchDeletePost(artist.community_id, post_id))
            .then(() => setPostDeleted(true))
            .then(() => setPostDeleted(false))
            .then(closeModal)
    }

    return (
        <div>
            <p>Delete Post ?</p>
            <button onClick={(e) => deletePost(e)}>Yes Delete</button>
            <button onClick={closeModal}>No Keep</button>
        </div>
    )
}

export default DeletePost
