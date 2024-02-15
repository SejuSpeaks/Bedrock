
const GET_LIKES = '/ALBUMLIKES/GETLIKES'
const LIKE_ALBUM = '/ALBUMLIKES/LIKEALBUM'

/* --LIKE ALBUM-- ------------------------------------------ */

const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        likes
    }
}


export const fetchGetLikes = () => async dispatch => {
    const response = await fetch('/api/likes/current')

    if (response.ok) {
        const data = await response.json()
        console.log('datatatatatat', data.likes)
        dispatch(getLikes(data.likes))
        return data.likes
    }

}






const albumLikes = (state = {}, action) => {
    let newState = {};
    switch (action.type) {

        case GET_LIKES:
            action.likes.map(like => {
                newState[like.id] = like
            })
            return newState || null

        default:
            return state;
    }
}

export default albumLikes
