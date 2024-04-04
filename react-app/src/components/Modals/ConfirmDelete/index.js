import { useModal } from "../../../context/Modal";




const ConfirmDelete = ({ comment, deleteComment }) => {
    const { closeModal } = useModal()

    const deletion = () => {
        deleteComment(comment.id)
        closeModal()
    }

    return (
        <div>
            confirm deletion
            <button onClick={() => deletion()}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
}

export default ConfirmDelete
