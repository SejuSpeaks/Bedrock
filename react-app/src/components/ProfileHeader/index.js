

import { useDispatch, useSelector } from 'react-redux'
import { fetchGetArtist } from '../../store/artist'
import './index.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import ArtistPageNav from '../ArtistPageNav'

const ProfileHeader = ({ followArtist, followsArtist }) => {
    const { artistid } = useParams()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const artist = useSelector(state => state.artist)
    const user = useSelector(state => state.session.user)



    useEffect(() => {
        dispatch(fetchGetArtist(artistid)).then(() => setIsLoaded(true))
    }, [])



    const albums = artist.albums


    const allAlbums = albums ? albums.map(album => {
        return (
            <div key={album.id} className='album-container-profile-header' >
                <img className="profile-header-album-cover" src={album.cover} alt="cover" />
                <p>{album.title}</p>
                <p>{new Date(album.release_date).getUTCFullYear()}</p>
            </div>
        );
    }) : "no albums"

    const followButtonClass = followsArtist ? 'profile-header-follow-button-active' : 'profile-header-follow-button'



    return (
        <div className='profile-header-container-whole'>
            {isLoaded && (
                <>
                    <div style={{ display: "flex", flexDirection: 'column' }}>
                        <img className="profile-header-image" src={artist.profile_picture} alt="profilepicture" />
                        <p>{artist.artist_name}</p>
                        <button onClick={() => followArtist(artist.id)} className={followButtonClass}>{followsArtist ? "Following" : "Follow"}</button>
                    </div>

                    <div className='all-albums-profile-header'>
                        <p>disography</p>
                        {allAlbums}
                    </div>
                </>
            )}


        </div>
    );
}

export default ProfileHeader;
