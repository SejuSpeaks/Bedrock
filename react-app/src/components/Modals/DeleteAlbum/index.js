import { useDispatch } from "react-redux";
import { fetchDeleteAlbum } from "../../../store/albums";
import { useModal } from "../../../context/Modal";


const DeleteAlbum = ({ album_id, setUpdateAlbumList }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const deleteAlbum = async (e) => {
        e.preventDefault()
        dispatch(fetchDeleteAlbum(album_id))
            .then(() => setUpdateAlbumList(true))
            .then(() => setUpdateAlbumList(false))
            .then(closeModal)
    }

    return (
        <div className="update-post-modal-container">
            <div className="delete-post-heading-container">
                <p>Delete Album</p>
            </div>

            <div className="delete-post-buttons-container">
                <button className="delete-post-buttons-delete" onClick={(e) => deleteAlbum(e)}>Yes Delete</button>
                <button className="delete-post-buttons-keep" onClick={closeModal}>No Keep</button>
            </div>

        </div>
    );
}

export default DeleteAlbum
