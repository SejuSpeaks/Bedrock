import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './index.css'

const ProfileHeader = () => {
    const user = useSelector(state => state.session.user.info)
    const albums = useSelector(state => state.session.user.albums)
    const dispatch = useDispatch()

    const allAlbums = albums.map(album => {
        return (
            <div>
                <img className="profile-header-album-cover" src={album.cover} alt="cover" />
                <p>{album.title}</p>
                <p>{album.release_date}</p>
            </div>
        );
    })

    useEffect(() => {

    }, [dispatch, user])

    return (
        <div>

            <div>
                <img className="profile-header-image" src={user.profile_picture} alt="profilepicture" />
                <p>{user.artist_name}</p>
                <button>Follow</button>
            </div>

            <div>
                <p>disography</p>
                {allAlbums}
            </div>


        </div>
    );
}

export default ProfileHeader;
