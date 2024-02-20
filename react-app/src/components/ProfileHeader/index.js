

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const [isOpen, setIsOpen] = useState(false)
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
    const [isOpen, setIsOpen] = useState(false)
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

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
<<<<<<< HEAD
<<<<<<< HEAD
                <p>{album.title}</p>
                <p>{new Date(album.release_date).getUTCFullYear()}</p>
=======
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                <div style={{ display: 'flex', 'flexDirection': 'column', 'alignItems': 'flex-start' }}>
                    <p style={{ fontSize: 12 }}>{album.title}</p>
                    <p style={{ fontSize: 12 }}>{new Date(album.release_date).getUTCFullYear()}</p>
                </div>
<<<<<<< HEAD
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
            </div>
        );
    }) : "no albums"

    const followButtonClass = followsArtist ? 'profile-header-follow-button-active' : 'profile-header-follow-button'


<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
    return (
        <div className='profile-header-container-whole'>
            {isLoaded && (
                <>
                    <div style={{ display: "flex", flexDirection: 'column' }}>
                        <img className="profile-header-image" src={artist.profile_picture} alt="profilepicture" />
                        <p>{artist.artist_name}</p>
                        <button onClick={() => followArtist(artist.id)} className={followButtonClass}>{followsArtist ? "Following" : "Follow"}</button>
                    </div>
<<<<<<< HEAD
<<<<<<< HEAD

                    <div className='all-albums-profile-header'>
                        <p>disography</p>
=======
                    {artist.bio && (<>
                        <div>
                            <p className={isOpen ? 'artist-bio-profile-headers-open' : "artist-bio-profile-headers"}>{artist.bio}</p>
                            <p onClick={() => setIsOpen(!isOpen)} className={'artist-bio-profile-headers-more'}>{isOpen ? "see less" : "see more"}</p>
                        </div>
                    </>)}

                    <div className='all-albums-profile-header'>
                        <p>discography </p>
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
                    {artist.bio && (<>
                        <div>
                            <p className={isOpen ? 'artist-bio-profile-headers-open' : "artist-bio-profile-headers"}>{artist.bio}</p>
                            <p onClick={() => setIsOpen(!isOpen)} className={'artist-bio-profile-headers-more'}>{isOpen ? "see less" : "see more"}</p>
                        </div>
                    </>)}

                    <div className='all-albums-profile-header'>
                        <p>discography </p>
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                        {allAlbums}
                    </div>
                </>
            )}


        </div>
    );
}

export default ProfileHeader;
