import { useModal } from "../../../context/Modal";




const ConfirmDelete = ({ comment, deleteComment }) => {
    const { closeModal } = useModal()

    const deletion = () => {
        deleteComment(comment.id)
        closeModal()
    }

    return (
        <div className="update-post-modal-container">
            <div className="delete-post-heading-container">
                <p>Delete Comment</p>
            </div>

            <div className="delete-post-buttons-container">
                <button className="delete-post-buttons-delete" onClick={(e) => deletion(e)}>Yes Delete</button>
                <button className="delete-post-buttons-keep" onClick={closeModal}>No Keep</button>
            </div>

        </div>
    );
}

export default ConfirmDelete
