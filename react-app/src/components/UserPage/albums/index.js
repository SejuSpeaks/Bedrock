import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../../OpenModalButton'
import UpdateAlbum from "../../UpdateAlbum";

import './index.css';
import { useEffect, useState } from "react";
import { authenticate } from "../../../store/session";
import { useHistory } from "react-router-dom";

const UserAlbums = () => {
    const [updateAlbumList, setUpdateAlbumList] = useState('thing')
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(authenticate())
    }, [updateAlbumList])

    const allAlbums = Object.values(user.albums).map(album => {
        return (
            <div key={album.id} className="album-container-user-page">
                <img onClick={() => history.push(`/artists/${album.artist_id}/albums/${album.id}`)} className="image-album-user-page" src={album.cover} alt="album cover" />

                <div>
                    <OpenModalButton buttonText={'Update'} modalComponent={<UpdateAlbum album={album} setUpdateAlbumList={setUpdateAlbumList} />}></OpenModalButton>
                    <button>Delete</button>
                </div>

            </div>
        );
    })

    return (
        <div className="all-user-albums-user-page-container">
            {allAlbums}
        </div>
    );
}

export default UserAlbums;
