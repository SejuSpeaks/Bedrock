
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUpdateAlbum } from '../../store/albums'
import './index.css'
import { useModal } from '../../context/Modal'

const UpdateAlbum = ({ album, setUpdateAlbumList }) => {
    const { closeModal } = useModal()
    const [title, setTitle] = useState(album.title)
    const [errors, setErrors] = useState({})
    const [cover, setCover] = useState(album.cover)
    const [genre, setGenre] = useState(album.genre)
    const [description, setDescription] = useState(album.description)
    const dispatch = useDispatch()

    const updateAlbum = async (e) => {
        e.preventDefault()

        const updatedAlbum = {
            'title': title,
            'cover': cover,
            'genre': genre,
            'description': description,
            'release_date': new Date(album.release_date).toISOString().split('T')[0]
        }

        const updateDispatch = dispatch(fetchUpdateAlbum(album.id, updatedAlbum))
        if (updateDispatch.Errors) setErrors({ ...errors, ...updateDispatch.errors })
        setUpdateAlbumList(true)
        setUpdateAlbumList(false)
        closeModal()
    }
    return (
        <div>
            <form onSubmit={(e) => updateAlbum(e)}>

                <label for='title' >Title: </label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>

                <label for='cover'>cover: </label>
                <input id="cover" value={cover} onChange={(e) => setCover(e.target.value)} ></input>
                <img className="update-album-image" src={cover} />

                <label for='genre'>Genre: </label>
                <input id='genre' value={genre} onChange={(e) => setGenre(e.target.value)} ></input>

                <label for='description' >Description: </label>
                <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <button>Update Album</button>
            </form>
        </div>
    );
}

export default UpdateAlbum
