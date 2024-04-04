import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useSelector } from "react-redux";

const EditComment = ({ comment, updateComment }) => {
    const { closeModal } = useModal()
    const [text, setText] = useState(comment.text)
    const user = useSelector(state => state.session.user)

    const submit = (e) => {
        e.preventDefault()
        if (!text) return
        updateComment(comment.id, text)
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

            Update comment
            <div>
                <form className="update-post-form" onSubmit={(e) => submit(e)}>
                    <input className="input-field" value={text} onChange={(e) => setText(e.target.value)}></input>
                    <button className="update-post-button">Update Comment</button>
                </form>
            </div>
        </div>
    )
}

export default EditComment;
