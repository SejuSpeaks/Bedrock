import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import './index.css'

const ProfileHeader = ({ artist }) => {
    const albums = artist.albums
    const [followsArtist, setFollowsArtist] = useState(false)
    const dispatch = useDispatch()


    const checkUserFollowingStatus = async id => {
        const response = await fetch(`/api/current/following/${id}`)

        if (response.ok) {
            const data = await response.json()
            setFollowsArtist(true)
            return data
        }
        else {
            const data = await response.json()
            console.log('UhOh', data)
        }
    }

    const followArtist = async (id) => {
        const response = await fetch(`/api/current/following/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const data = await response.json()
            setFollowsArtist(!followsArtist)
            console.log(followsArtist, 'after change')
            return data
        }
        else {
            const data = await response.json()
            console.log('UhOh', data)
        }
    }


    useEffect(() => {
        checkUserFollowingStatus(artist.id)
    }, [artist.id])

    const allAlbums = albums ? albums.map(album => {
        return (
            <div>
                <img className="profile-header-album-cover" src={album.cover} alt="cover" />
                <p>{album.title}</p>
                <p>{album.release_date}</p>
            </div>
        );
    }) : "no albums"

    const followButtonClass = followsArtist ? 'profile-header-follow-button-active' : 'profile-header-follow-button'


    return (
        <div>

            <div>
                <img className="profile-header-image" src={artist.profile_picture} alt="profilepicture" />
                <p>{artist.artist_name}</p>
                <button onClick={() => followArtist(artist.id)} className={followButtonClass}>{followsArtist ? 'Followed' : 'Follow'}</button>
            </div>

            <div>
                <p>disography</p>
                {allAlbums}
            </div>


        </div>
    );
}

export default ProfileHeader;
