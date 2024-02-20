
<<<<<<< HEAD
<<<<<<< HEAD

//dispatch album details
//artist all albums
//artist location
//artist name
//album images
//songs

=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchGetAlbum } from "../../store/albums";
import { useParams } from "react-router-dom";
import { findLike } from "./findLike";
import { likeAlbum } from "./likeAlbum";

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
<<<<<<< HEAD
<<<<<<< HEAD
            console.log('UhOh', data)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
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
<<<<<<< HEAD
<<<<<<< HEAD
            console.log(followsArtist, 'after change')
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
            return data
        }
        else {
            const data = await response.json()
<<<<<<< HEAD
<<<<<<< HEAD
            console.log('UhOh', data)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
        }
    }


    const [isLoaded, setIsLoaded] = useState(false)
    const [songPlaying, setSongPlaying] = useState('')
    const [liked, setLiked] = useState(false)
    const { albumid } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const album = useSelector(state => state.albums)
    const artist = useSelector(state => state.albums.artist)
    let artistId;

    //get album by id
    //if album not found push to 404
    useEffect(() => {

        dispatch(fetchGetAlbum(albumid))
            .then(res => {
                if (res.Errors) return history.push('/404')
                artistId = (res.album.artist.id)
            })

            .then(() => checkUserFollowingStatus(artistId))
            .then(() => findLike(albumid, setLiked))

            .then(() => setIsLoaded(true))


    }, [liked])


    //every song on album
    const allSongs = isLoaded && album?.songs.map(song => {
        return (
            <div key={song.id} className="album-details-song-container">
<<<<<<< HEAD
<<<<<<< HEAD
                <button onClick={() => setSongPlaying(song.url)}>Play</button>
=======
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                <div className="play-button-container">
                    <i onClick={() => setSongPlaying(song.url)} class="fa-solid fa-play"></i>
                </div>
                {/* <button >Play</button> */}
<<<<<<< HEAD
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                <p>{song.name}</p>
            </div>
        );
    })

    //element states
    const heartFill = liked ? "red" : "none"
    const heartStroke = liked ? "none" : "black"
<<<<<<< HEAD
<<<<<<< HEAD
    console.log('SONG PLAYING', songPlaying)
=======
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140

    return (
        <div className="album-details-page-container">
            <ArtistPageNav />
            {isLoaded &&
                <>
                    <div className="album-details-content-container">
<<<<<<< HEAD
<<<<<<< HEAD
                        <ProfileHeader followsArtist={followsArtist} followArtist={followArtist} />
                        <div className="album-images-container">
                            <img className="album-secondary-image" src={album.images.length ? album.images[0].url : "https://media.newyorker.com/photos/641b2438c7a56c8e6b95a36d/master/pass/Gopnik-We-Love-NYC.jpg"} alt="album visual" />
                            <audio controls src={songPlaying} />
=======


                        <div className="artist-profile-header-container">
                            <ProfileHeader followsArtist={followsArtist} followArtist={followArtist} />
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                        </div>



                        <div className="album-details-container">
                            <div className="content-container-album-details">
                                <div className="album-container-album-details">

<<<<<<< HEAD
                                    <p className="album-details-album-title">{album.details.title}</p>
                                    <p>by {artist.artist_name}</p>
                                    <img className='album-details-image' src={album.details.cover} />
=======


                        <div className="artist-profile-header-container">
                            <ProfileHeader followsArtist={followsArtist} followArtist={followArtist} />
                        </div>



                        <div className="album-details-container">
                            <div className="content-container-album-details">
                                <div className="album-container-album-details">

                                    <img className='album-details-image' src={album.details.cover} alt="album cover" />
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======
                                    <img className='album-details-image' src={album.details.cover} alt="album cover" />
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                                    {user && (

                                        <div className="album-details-wishlist-container">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="16"
                                                height="16"
                                                stroke={heartStroke}
                                                fill={heartFill}
                                                onClick={() => { likeAlbum(albumid, setLiked, liked, dispatch) }}
                                            >
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                />
                                            </svg>
<<<<<<< HEAD
<<<<<<< HEAD
                                            <p>Wishlist</p>
=======
                                            <p style={{ fontSize: '12px' }}>Wishlist</p>
>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                                        </div>
                                    )}
                                </div>
                                <div className="album-images-container">
                                    <div className="album-title-and-owner-container">
                                        <p className="album-details-album-title">{album.details.title}</p>
                                        <p>by {artist.artist_name}</p>
                                    </div>
                                    {/* <img className="album-secondary-image" src={album.images.length ? album.images[0].url : "https://media.newyorker.com/photos/641b2438c7a56c8e6b95a36d/master/pass/Gopnik-We-Love-NYC.jpg"} alt="album visual" /> */}
                                    <audio controls src={songPlaying} />
                                    <div className="all-songs-container">
                                        {allSongs}
                                    </div>
                                </div>
                            </div>


<<<<<<< HEAD
                            <div className="all-songs-container">
                                {allSongs}
                            </div>
=======
                                            <p style={{ fontSize: '12px' }}>Wishlist</p>
                                        </div>
                                    )}
                                </div>
                                <div className="album-images-container">
                                    <div className="album-title-and-owner-container">
                                        <p className="album-details-album-title">{album.details.title}</p>
                                        <p>by {artist.artist_name}</p>
                                    </div>
                                    {/* <img className="album-secondary-image" src={album.images.length ? album.images[0].url : "https://media.newyorker.com/photos/641b2438c7a56c8e6b95a36d/master/pass/Gopnik-We-Love-NYC.jpg"} alt="album visual" /> */}
                                    <audio controls src={songPlaying} />
                                    <div className="all-songs-container">
                                        {allSongs}
                                    </div>
                                </div>
                            </div>



>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
=======

>>>>>>> 7b101935324880b3d94c82a8fe5a306252da7140
                        </div>
                    </div>
                </>
            }
        </div>
    );

}

export default AlbumDetails;
