import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './index.css'

const AlbumForm = () => {
    const [songNames, setSongNames] = useState([])
    const [file, setFile] = useState(null)
    const [fileArr, setFileArr] = useState([])
    const [title, setTitle] = useState('Untitled Album')
    const [cover, setCover] = useState('')
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()


    const fileUpload = (e) => {
        setFile(e.target.files[0])
        setFileArr([...fileArr, e.target.files[0]])
    }

    const deleteTrack = (e, index) => {
        e.preventDefault()
        const updatedTrackList = [...fileArr]
        updatedTrackList.splice(index, 1);
        setFileArr(updatedTrackList)
    }

    const handleNameChange = (index, name) => {
        const updatedSongNames = [...songNames];
        updatedSongNames[index] = name
        setSongNames(updatedSongNames)
    }

    const tracks = fileArr.map((file, index) => {
        return (
            <div key={index}>
                <p>{songNames[index] ? songNames[index] : "Untitled Track"}</p>
                <input type='text' value={songNames[index]} onChange={(e) => handleNameChange(index, e.target.value)}></input>
                <button onClick={(e) => deleteTrack(e, index)}>delete</button>
            </div >
        );
    })


    useEffect(() => {
        if (title.length === 0) setTitle('Untitled Album')

    }, [title])


    return (
        <div>
            <form action='/albums' method='POST' >
                <div>
                    <div>
                        <img src={cover} alt='cover of album' />
                        <input placeholder='Album cover' onChange={(e) => setCover(e.target.value)}></input>
                    </div>
                    <div>
                        <input id='album-title' placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>
                        <p>{title}</p>
                        <p>by: {user.artist_name ? user.artist_name : "noNamer"}</p>
                    </div>
                </div>

                <div>
                    <div>
                        <form encType="multipart/form-data">
                            <label for='file-upload' className='custom-file-upload'>Add a  Song</label>
                            <input id='file-upload' type='file' accept='mp3/*' onChange={(e) => fileUpload(e)}></input>
                        </form>
                        <p>Tracks</p>
                        <p>{tracks}</p>
                    </div>
                    <div>
                        <label>About this album</label>
                        <textarea></textarea>
                    </div>
                </div>
                <button>Submit Album</button>
            </form>
        </div>
    );
}

export default AlbumForm;
