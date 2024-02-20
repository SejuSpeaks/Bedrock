
const GET_LIKES = '/ALBUMLIKES/GETLIKES'
const LIKE_ALBUM = '/ALBUMLIKES/LIKEALBUM'


/* --LIKE ALBUM-- --------------------------------------------------  */
const likeAlbum = (like) => {
    return {
        type: LIKE_ALBUM,
        like
    }
}

export const fetchLikeAlbum = (album_id) => async dispatch => {
    const response = await fetch(`/api/albums/${album_id}/likes`, {
        method: "Post",
    })

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) {
            return data.Errors
        }
        dispatch(likeAlbum(data.like))
        return data.like
    }
}


/* --GET LIKES FOR ALBUM-- ------------------------------------------ */

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

        case LIKE_ALBUM:
            newState = { ...state }
            if (action.like) {
                newState[action.like.id] = action.like
                return newState
            }
            else return newState

        default:
            return state;
    }
}

export default albumLikes
