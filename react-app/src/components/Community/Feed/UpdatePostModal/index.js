import { useState } from "react";
import { fetchUpdatePost } from "../../../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../../context/Modal";



const UpdatePost = ({ post }) => {
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
        closeModal()
    }

    return (
        <div>
            <form onSubmit={(e) => postUpdated(e)}>
                <input value={text} onChange={(e) => setText(e.target.value)}></input>
                <button>Update Post</button>
            </form>
        </div>
    );
}

export default UpdatePost;
