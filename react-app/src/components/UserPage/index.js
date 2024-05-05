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
    const header = user.header;
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

                    <div className="profile-header" style={{ backgroundImage: `url('${header}')` }}>

                    </div>
                    <div className="user-profile-image-name-container">

                        <div className="image-container-user-profile">
                            <img className="user-profile-profile-picture" src={user.profile_picture} alt='user profile' />
                        </div>

                        <div className="username-bio-container">
                            <p style={{ fontWeight: "bold" }}>{user.username}</p>
                            <button className="edit-profile-button">Edit Profile</button>
                        </div>
                    </div>
                    <div className="user-profile-tabs-container">
                        <p className={tab === 'likes' ? 'tabactive' : 'tab'} onClick={() => setTab('likes')}>Likes</p>
                        <p className={tab === 'followers' ? 'tabactive' : 'tab'} onClick={() => setTab('followers')} >Followers</p>
                        <p className={tab === 'albums' ? 'tabactive' : 'tab'} onClick={() => setTab('albums')}>Albums</p>
                    </div>
                    <div className="tab-inside-container">
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
