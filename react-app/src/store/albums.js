
const POST_ALBUM = '/ALBUMS/POSTALBUM'
const GET_ALL_ALBUMS = '/ALBUMS/ALLALBUMS'
const GET_ALBUM = '/ALBUMS/GETALBUM'
const DELETE_ALBUM = 'ALBUM/DELETEALBUM'



/* --Get Artist Albums-- -------------------------------------------------------------------- */


/* --Get Album-- --------------------------------------------------------------------------- */

//action
const getAlbum = (album) => {
    return {
        type: GET_ALBUM,
        album
    }
}


//thunk
export const fetchGetAlbum = (id) => async dispatch => {
    const response = await fetch(`/api/albums/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getAlbum(data.album))
        return data
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}



/* --Create ALbum -- -----------------------------------------------------------------------*/

//action
const createAlbum = (album) => {
    return {
        type: POST_ALBUM,
        album
    }
}


//thunk
export const fetchCreateAlbum = (payload) => async dispatch => {


    const response = await fetch('/api/albums/', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const data = await response.json()

        if (data.Errors) return data.Errors

        dispatch(createAlbum(data.album))
        return data
    }
}

/* --Reducer-- ---------------------------------------------------------------- */


const albums = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case POST_ALBUM:
            newState[action.album.id] = action.album
            return newState

        case GET_ALBUM:
            newState[action.album.details.id] = action.album
            return newState


        default:
            return state;
    }
}

export default albums
