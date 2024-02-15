

//dispatch album details
//artist all albums
//artist location
//artist name
//album images
//songs

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchGetAlbum } from "../../store/albums";
import { useParams } from "react-router-dom";

import './index.css'
import ProfileHeader from "../ProfileHeader";
import ArtistPageNav from "../ArtistPageNav";

const AlbumDetails = () => {
    const user = useSelector(state => state.session.user)
    //HEADER SUBSCRIBER FUNCTIONS
    const [followsArtist, setFollowsArtist] = useState(false)

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

    //FOLLOW AN ARTIST FUNCTION
    const followArtist = async (id) => {
        if (!user) return

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


    const [isLoaded, setIsLoaded] = useState(false)
    const [songPlaying, setSongPlaying] = useState('')
    const { albumid } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const album = useSelector(state => state.albums)
    const artist = useSelector(state => state.albums.artist)
    let artistId;

    useEffect(() => {

        dispatch(fetchGetAlbum(albumid))
            .then(res => {
                if (res.Errors) return history.push('/404')
                artistId = (res.album.artist.id)
            })

            .then(() => checkUserFollowingStatus(artistId))

            .then(() => setIsLoaded(true))


    }, [dispatch])



    const allSongs = isLoaded && album?.songs.map(song => {
        return (
            <div key={song.id} className="album-details-song-container">
                <button onClick={() => setSongPlaying(song.url)}>Play</button>
                <p>{song.name}</p>
            </div>
        );
    })

    return (
        <div className="album-details-page-container">
            <ArtistPageNav />
            {isLoaded &&
                <>
                    <div className="album-images-container">
                        <img src="example.com" alt="album visual" />
                        <audio controls src={songPlaying} />
                    </div>

                    <div className="album-details-container">
                        <div>
                            <p>{album.details.title}</p>
                            <p>by {artist.artist_name}</p>
                            <img className='album-details-image' src={album.details.cover} />
                            <p>Wishlist</p>
                        </div>


                        <div>
                            {allSongs}
                        </div>
                    </div>

                    {/* <div>
                        <ProfileHeader artist={artist} />
                    </div> */}
                </>
            }
            <ProfileHeader followsArtist={followsArtist} followArtist={followArtist} />
        </div>
    );

}

export default AlbumDetails;
