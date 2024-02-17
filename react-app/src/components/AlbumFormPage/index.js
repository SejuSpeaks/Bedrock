import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreateAlbum } from '../../store/albums'
import { fetchCreateSong } from '../../store/songs'
import { fetchAddSecondImage } from './addSecondImage'
import './index.css'
import { useHistory, Redirect } from 'react-router-dom'

const AlbumForm = () => {
    const [songNames, setSongNames] = useState([])
    const [fileArr, setFileArr] = useState([])
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState('')
    const [secondaryImage, setSecondaryImage] = useState('')
    const [date, setDate] = useState('')
    const [genre, setGenre] = useState('')
    // const [tags, setTags] = useState([])
    const [description, setDescription] = useState('')
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    if (!user || !user.artist_account) {
        return <Redirect path='/' />
    }

    //WHEN ADD SONG BUTTON IS CLICKED
    const fileUpload = (e) => {
        //setter for array
        setFileArr([...fileArr, e.target.files[0]])
    }

    //WHEN DELETE BUTTON IS PRESSED ON SONG
    const deleteTrack = (e, index) => {
        e.preventDefault()
        const updatedTrackList = [...fileArr]
        updatedTrackList.splice(index, 1);
        setFileArr(updatedTrackList)
    }

    //CHANGING SONGS NAME
    const handleNameChange = (index, name) => {
        const updatedSongNames = [...songNames];
        updatedSongNames[index] = name
        setSongNames(updatedSongNames)
    }

    //SONGS ADDED TO ALBUM
    const tracks = fileArr.map((file, index) => {
        return (
            <div key={index}>
                <p>{songNames[index] ? songNames[index] : "Untitled Track"}</p>
                <input type='text' value={songNames[index]} onChange={(e) => handleNameChange(index, e.target.value)}></input>
                <button onClick={(e) => deleteTrack(e, index)}>delete</button>
            </div >
        );
    })

    //WHEN SUBMIT BUTTON PRESSED
    const onSubmit = async (e) => {
        e.preventDefault()

        console.log(fileArr)

        const album = {
            "title": title,
            "cover": cover,
            "genre": genre,
            "description": description,
            "release_date": date
        }
        //thunk for creating album
        const createdAlbum = await dispatch(fetchCreateAlbum(album))
        console.log('CREATED albm', createdAlbum)

        await fetchAddSecondImage(createdAlbum, secondaryImage)

        if (fileArr.length) {

            //for every file in file Arr await disptach create song thunk
            for (let i = 0; i <= fileArr.length - 1; i++) {
                //create song object
                const formData = new FormData()
                formData.append('name', songNames[i])
                formData.append('song_file', fileArr[i])



                //dispatch song to the id of the album plus name of song
                const createdSong = await dispatch(fetchCreateSong(createdAlbum.album.id, formData))
                console.log(createdSong)
            }
        }

        history.push(`/artists/${user.id}/albums/${createdAlbum.album.id}`)
    }


    return (
        <div>
            <form action='/albums' method='POST' encType="multipart/form-data" onSubmit={(e) => onSubmit(e)} className='create-album-form-container'>
                <div className='create-album-form-header'>

                    <div className='create-album-form-header-left'>

                        <div className='create-album-image-container'>
                            <img className='album-form-image' src={cover ? cover : 'https://garden.spoonflower.com/c/2808368/p/f/m/wz4MJ0j3cdHpOHkTN5qdj7tovQRD_FFQl_DuHWO3th-bkCbrFGzA704q/Solid%20Mid%20Grey.jpg'} alt='cover of album' />
                            <input placeholder='Album cover' value={cover} onChange={(e) => setCover(e.target.value)}></input>
                        </div>

                        <div className='create-album-title-container'>
                            <p>{title ? title : "Untitled Album"}</p>
                            <p>by: {user.artist_name ? user.artist_name : "noNamer"}</p>
                        </div>

                    </div>

                    <div className='create-album-form-header-right'>

                        <div className='create-album-right-header-container'>
                            <input id='album-title' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>
                            <input placeholder='Release date' type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
                        </div>

                    </div>

                </div>

                <div className='create-album-form-bottomn-container'>
                    <div className='create-album-form-bottomn-left-container'>

                        <label for='file-upload' className='custom-file-upload'>Add a  Song</label>
                        <input id='file-upload' type='file' accept='mp3/*' onChange={(e) => fileUpload(e)}></input>

                        <p>Tracks</p>
                        <p>{tracks}</p>
                    </div>

                    <div className='create-album-form-bottomn-right-container'>
                        <label>About this album</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>

                        {/* <label for='tags'>tags:</label>
                        <input id='tags' value={tags}></input> */}

                        <label for='genre'>genre:</label>
                        <input value={genre} onChange={(e) => setGenre(e.target.value)} id='genre'></input>

                        <label for='secondary-images'>Seconary Images: </label>
                        <input value={secondaryImage} onChange={(e) => setSecondaryImage(e.target.value)} id='secondary-images'></input>

                        <img src={secondaryImage} />
                    </div>
                </div>

                <button>Submit Album</button>
            </form>
        </div>
    );
}

export default AlbumForm;
