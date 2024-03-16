import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

const EditComment = ({ comment, updateComment }) => {
    const { closeModal } = useModal()
    const [text, setText] = useState(comment.text)
    const dispatch = useDispatch()

    const submit = (e) => {
        e.preventDefault()
        if (!text) return
        updateComment(comment.id, text)
        closeModal()

    }

    return (
        <div>
            Update comment
            <form onSubmit={(e) => submit(e)}>
                <input value={text} onChange={(e) => setText(e.target.value)}></input>
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditComment;
