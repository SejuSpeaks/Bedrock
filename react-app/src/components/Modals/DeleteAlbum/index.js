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
        <div>
            <button onClick={(e) => deleteAlbum(e)}>Yes Delete Album</button>
            <button>No Keep Album</button>
        </div>
    );
}

export default DeleteAlbum
