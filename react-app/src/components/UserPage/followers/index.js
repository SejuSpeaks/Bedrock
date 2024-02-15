import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGetFollowers } from "../../../store/followers"


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
            <div>
                <img src={follower.profile_picture} />
                <p>{follower.username}</p>
            </div>
        )
    })

    return (
        <div>
            {isLoaded && (
                <>
                    <div>
                        {allFollowers}
                    </div>
                </>
            )}
        </div>
    )
}

export default Followers
