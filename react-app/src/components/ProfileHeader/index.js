

import { useDispatch, useSelector } from 'react-redux'
import { fetchGetArtist } from '../../store/artist'
import './index.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import ArtistPageNav from '../Navs/ArtistPageNav'

const ProfileHeader = ({ followArtist, followsArtist, setIsFollowing }) => {
    const { artistid } = useParams()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

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
                <div style={{ display: 'flex', 'flexDirection': 'column', 'alignItems': 'flex-start' }}>
                    <p style={{ fontSize: 12 }}>{album.title}</p>
                    <p style={{ fontSize: 12 }}>{new Date(album.release_date).getUTCFullYear()}</p>
                </div>
            </div>
        );
    }) : "no albums"

    const followButtonClass = followsArtist ? 'profile-header-follow-button-active' : 'profile-header-follow-button'
    const userIsOwner = user && user.id === Number(artistid)

    return (
        <div className='profile-header-container-whole'>
            {isLoaded && (
                <>

                    <div className='bio-container'>
                        <div className='profile-header-image-container'>
                            <img className="profile-header-image" src={artist.profile_picture} alt="profilepicture" />
                        </div>
                        <p id='artist-name-header'>{artist.artist_name}</p>
                        <p>{artist.city}</p>

                        {!userIsOwner && (
                            <button onClick={() => followArtist(followsArtist, setIsFollowing, artist.id)} className={followButtonClass}>{followsArtist ? "Following" : "Follow"}</button>
                        )}
                        {userIsOwner && (
                            <button className={followButtonClass}>{'Owner'}</button>
                        )}
                    </div>

                    {artist.bio && (<>
                        <div className='artist-bio-header'>
                            <p className={isOpen ? 'artist-bio-profile-headers-open' : "artist-bio-profile-headers"}>{artist.bio}</p>
                            <p onClick={() => setIsOpen(!isOpen)} className={'artist-bio-profile-headers-more'}>{isOpen ? "see less" : "see more"}</p>
                        </div>
                    </>)}

                    <div className='all-albums-profile-header'>
                        <p>discography </p>
                        {allAlbums}
                    </div>
                </>
            )}


        </div>
    );
}

export default ProfileHeader;
