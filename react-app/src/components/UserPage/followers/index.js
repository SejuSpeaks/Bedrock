import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetFollowers } from "../../../store/followers"

<<<<<<< HEAD
=======
import './index.css'
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3

const Followers = () => {
    const dispatch = useDispatch()
    const followers = useSelector(state => state.followings)
    const user = useSelector(state => state.session.user.info)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchGetFollowers())
            .then(() => setIsLoaded(true))
    }, [])

    const allFollowers = isLoaded && Object.values(followers).map(follower => {
        return (
<<<<<<< HEAD
            <div>
                <img src={follower.profile_picture} />
=======
            <div className="follower-container">
                <img className="follower-image" src={follower.profile_picture} />
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
                <p>{follower.username}</p>
            </div>
        )
    })

    return (
        <div>
            {isLoaded && (
<<<<<<< HEAD
                <>
                    <div>
=======
                < >
                    <div className="follower-tab-container">
>>>>>>> 207fad1617ac56749c0160b847c7270a1a1343a3
                        {allFollowers}
                    </div>
                </>
            )}
        </div>
    )
}

export default Followers
