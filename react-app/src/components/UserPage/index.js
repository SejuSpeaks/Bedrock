import { useDispatch, useSelector } from "react-redux";
import { fetchGetLikes } from "../../store/albumLikes";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Likes from "./likes";
import Followers from "./followers";

import './index.css'
import UserAlbums from "./albums";

const UserPage = ({ isLoaded }) => {
    const [tab, setTab] = useState('likes')
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

    }, [])


    if (!user) {
        return <Redirect to='/' />
    }

    return (
        <div>
            {isLoaded && (
                <>

                    <div className="profile-header">

                    </div>
<<<<<<< HEAD
                    <div>
                        <img className="user-profile-profile-picture" src={user.profile_picture} alt='user profile' />
                        <p>{user.username}</p>
                    </div>
                    <div className="user-profile-tabs-container">
                        <p onClick={() => setTab('likes')}>Likes</p>
                        <p onClick={() => setTab('followers')} >Followers</p>
                        <p onClick={() => setTab('albums')}>My Albums</p>
                    </div>
                    <div>
=======
                    <div className="user-profile-image-name-container">
                        <img className="user-profile-profile-picture" src={user.profile_picture} alt='user profile' />
                        <p>{user.username}</p>
                        <p>{user.bio}</p>
                    </div>
                    <div className="user-profile-tabs-container">
                        <p className={tab === 'likes' ? 'tabactive' : ''} onClick={() => setTab('likes')}>Likes</p>
                        <p className={tab === 'followers' ? 'tabactive' : ''} onClick={() => setTab('followers')} >Followers</p>
                        <p className={tab === 'albums' ? 'tabactive' : ''} onClick={() => setTab('albums')}>My Albums</p>
                    </div>
                    <div className="tab-inside-container">
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
                        {tab == 'likes' && <Likes />}
                        {tab == 'followers' && <Followers />}
                        {tab == 'albums' && <UserAlbums />}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserPage;
