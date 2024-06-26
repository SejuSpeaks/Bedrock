import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../../OpenModalButton'
import UpdateAlbum from "../../Modals/UpdateAlbum";

import './index.css';
import { useEffect, useState } from "react";
import { authenticate } from "../../../store/session";
import { useHistory } from "react-router-dom";
import DeleteAlbum from "../../Modals/DeleteAlbum";

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

                <div className="update-album-buttons-container">
                    <OpenModalButton className={'update-album-buttons update-button'} buttonText={'Update'} modalComponent={<UpdateAlbum album={album} setUpdateAlbumList={setUpdateAlbumList} />}></OpenModalButton>
                    <OpenModalButton className={'update-album-buttons delete-button'} buttonText={'Delete'} modalComponent={<DeleteAlbum album_id={album.id} setUpdateAlbumList={setUpdateAlbumList} />} ></OpenModalButton>
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
