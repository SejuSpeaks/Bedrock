const GET_ALL_POSTS = '/POSTS/GETALL'
const GET_POST = '/POSTS/GETONE'
const POST_A_POST = '/POSTS/POST'
const DELETE_A_POST = '/POST/DELETEPOST'
const UPDATE_POST = '/POST/POST'


/* --UPDATE POST-- --------------------------------------------------------- */

//action
const updatePost = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}


//thunk
export const fetchUpdatePost = (community_id, post_id, payload) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}/${post_id}`, {
        method: "Put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) {
            return data.Errors
        }

        dispatch(updatePost(data.post))
        return data.post
    }
}


/* --DELETE POST-- -------------------------------------------------------- */
//action
const deletePost = (post_id) => {
    return {
        type: DELETE_A_POST,
        post_id
    }
}

//thunk
export const fetchDeletePost = (community_id, post_id) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}/${post_id}`, {
        method: "Delete"
    })

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) return data.Errors

        dispatch(deletePost(data["Id of post deleted"]))
        return data["Id of post deleted"]
    }
}



/* --GET POST BY ID-- ---------------------------------------------------- */

//action
const getPost = (post) => {
    return {
        type: GET_POST,
        post
    }
}

//thunk
export const fetchGetAPost = (community_id, post_id) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}/${post_id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getPost(data.post))
        return data.post
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}




/* --POST POST-- ------------------------------------------- */

//action
const postPost = (post) => {
    return {
        type: POST_A_POST,
        post
    }
}


//thunk
export const fetchPostPost = (community_id, payload) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const data = await response.json()
        if (data.Errors) return data

        dispatch(postPost(data.post))
        return data.post
    }

}


/* --GET POSTS-- ------------------------------------------ */

//action
const getPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}


//thunk
export const fetchAllPosts = (community_id) => async dispatch => {
    const response = await fetch(`/api/posts/${community_id}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getPosts(data.posts))
        return data.posts
    }
    else {
        const data = await response.json();
        return data.Errors;
    }
}

const posts = (state = {}, action) => {
    let newState = {};
    switch (action.type) {

        case GET_POST:
            const postById = action.post
            newState = { ...postById }
            return newState

        case GET_ALL_POSTS:
            if (action.posts) {
                const posts = action.posts.map(post => {
                    newState[post.id] = post
                })
                return newState
            }
            else return newState

        case POST_A_POST:
            const post = action.post
            newState = { ...state }
            newState[post.id] = post
            return newState

        case UPDATE_POST:
            console.log('too')
            newState = { ...state }
            newState[action.post.id] = action.post
            return newState

        case DELETE_A_POST:
            newState = { ...state }
            delete newState[action.post_id]
            return newState

        default:
            return state;
    }
}

export default posts
