
const POST_ALBUM = '/ALBUMS/POSTALBUM'
const GET_ALL_ALBUMS = '/ALBUMS/ALLALBUMS'
const GET_ALBUM = '/ALBUMS/GETALBUM'
const DELETE_ALBUM = 'ALBUM/DELETEALBUM'



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




const albums = (state = {}, action) => {
    switch (action.type) {
        case POST_ALBUM:
            const newState = { ...state }
            newState[action.album.id] = action.album
            return newState

        default:
            return state;
    }
}

export default albums
