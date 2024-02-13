const GET_ALL_POSTS = '/POSTS/GETALL'
const POST_A_POST = '/POSTS/POST'
const DELETE_A_POST = '/POST/DELETEPOST'
const UPDATE_POST = '/POST/POST'


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

    console.log('RESPONSE', response)

    if (response.ok) {
        const data = await response.json()
        console.log(data, 'DATAJDSHDJ')
        dispatch(postPost(data.post))
        return data.post
    }
    else {
        const data = await response.json()
        return data.Errors
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

        case GET_ALL_POSTS:
            const posts = action.posts.map(post => {
                newState[post.id] = post
            })
            return newState

        case POST_A_POST:
            const post = action.post
            newState = { ...state }
            newState[post.id] = post
            return newState

        default:
            return state;
    }
}

export default posts
