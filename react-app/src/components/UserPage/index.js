import { useDispatch, useSelector } from "react-redux";
import { fetchGetLikes } from "../../store/albumLikes";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Likes from "./likes";
import Followers from "./followers";

import './index.css'

const UserPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
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
            {(
                <>

                    <div className="profile-header">

                    </div>
                    <div>
                        <img className="user-profile-profile-picture" src={user.info.profile_picture} alt='user profile' />
                        <p>{user.info.username}</p>
                    </div>
                    <div>
                        <p onClick={() => setTab('likes')}>Likes</p>
                        <p onClick={() => setTab('followers')} >Followers</p>
                    </div>
                    <div>
                        {tab == 'likes' && <Likes />}
                        {tab == 'followers' && <Followers />}
                    </div>
                </>
            )}
        </div>
    );
}

export default UserPage;