const FOLLOW_USER = 'FOLLOWERS/FOLLOWUSER'
const GET_FOLLOWERS = 'FOLLOWERS/GETFOLLOWERS'




/* --Get Followers */
//action
const getFollowers = (followers) => {
    return {
        type: GET_FOLLOWERS,
        followers
    }
}

//thunk
export const fetchGetFollowers = () => async dispatch => {
    const response = await fetch('/api/current/following/')

    if (response.ok) {
        const data = await response.json()
        dispatch(getFollowers(data.followers))
    }
}




/* --Follow user-- ------------------------------------------------------------------ */


//action
const follow_user = (user_followed) => {
    return {
        type: FOLLOW_USER,
        user_followed
    }
}


//thunk
export const fetchFollowUser = (id) => async dispatch => {

    const response = await fetch(`/api/current/following/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(follow_user(data))
        return data
    }
    else {
        const data = await response.json()
        return data.Errors
    }

}




const followings = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_FOLLOWERS:
            action.followers.map(follower => {
                newState[follower.id] = follower
            })
            return newState


        case FOLLOW_USER:
            newState = { ...state }
            newState[action.user_followed.id] = action.user_followed
            return newState

        default:
            return state;
    }
}

export default followings
