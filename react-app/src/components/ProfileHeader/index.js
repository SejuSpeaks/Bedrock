

import { useDispatch, useSelector } from 'react-redux'
import { fetchGetArtist } from '../../store/artist'
import './index.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProfileHeader = ({ followArtist, followsArtist }) => {
    const { artistid } = useParams()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const artist = useSelector(state => state.artist)



    useEffect(() => {
        dispatch(fetchGetArtist(artistid)).then(() => setIsLoaded(true))
    }, [])



    const albums = artist.albums


    const allAlbums = albums ? albums.map(album => {
        return (
            <div key={album.id}>
                <img className="profile-header-album-cover" src={album.cover} alt="cover" />
                <p>{album.title}</p>
                <p>{album.release_date}</p>
            </div>
        );
    }) : "no albums"

    const followButtonClass = followsArtist ? 'profile-header-follow-button-active' : 'profile-header-follow-button'


    return (
        <div>
            {isLoaded && (
                <>
                    <div>
                        <img className="profile-header-image" src={artist.profile_picture} alt="profilepicture" />
                        <p>{artist.artist_name}</p>
                        <button onClick={() => followArtist(artist.id)} className={followButtonClass}>{followsArtist ? 'Followed' : 'Follow'}</button>
                    </div>

                    <div>
                        <p>disography</p>
                        {allAlbums}
                    </div>
                </>
            )}


        </div>
    );
}

export default ProfileHeader;
