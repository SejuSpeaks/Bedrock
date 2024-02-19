const GET_COMMENTS = '/COMMENTS/GETCOMMENTS'
const POST_COMMENT = '/COMMENTS/POSTCOMMENT'
const UPDATE_COMMENT = '/COMMENTS/UPDATECOMMENT'
const DELETE_COMMENT = '/COMMENTS/DELETECOMMENT'

/* --GET COMMENTS-- ------------------------------------- */

//action
const getComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}


//thunk
export const fetchGetComments = (community_id, post_id) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}/${post_id}/comments`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getComments(data.comments))
        return data.comments
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}

/* --POST COMMENT-- ------------------------------------------ */

//action
const postComment = (comment) => {
    return {
        type: POST_COMMENT,
        comment
    }
}

//thunk
export const fetchPostComment = (community_id, post_id, payload) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}/${post_id}/comments`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(postComment(data.comment))
        return data.comment
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}

/* --UPDATE COMMENT-- --------------------------------------------- */

//action
const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}


//thunk
export const fetchUpdateComment = (community_id, post_id, comment_id, payload) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}/${post_id}/comments/${comment_id}`, {
        method: "Put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)

    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateComment(data.comment))
        return data.comment
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}

/* --DELETE COMMENT-- ------------------------------------------------ */

//action
const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}

//thunk
export const fetchDeleteComment = (community_id, post_id, comment_id) => async dispatch => {
    const response = await fetch(`/api/posts/${comment_id}/${post_id}/comments/${comment_id}`, {
        method: "Delete"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateComment(data["id for comment deleted"]))
        return data["id for comment deleted"]
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}


const comments = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET_COMMENTS:
            if (action.comments) {
                action.comments.map(comment => {
                    newState[comment.id] = comment
                })
                return newState
            }
            else return newState

        case POST_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState

        case UPDATE_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState

        case DELETE_COMMENT:
            newState = { ...state }
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default comments;
