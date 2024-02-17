
const POST_ALBUM = '/ALBUMS/POSTALBUM'
const GET_ALL_ALBUMS = '/ALBUMS/ALLALBUMS'
const GET_ALBUM_BY_TAG = '/ALBUMS/GETBYTAG'
const GET_ALBUM = '/ALBUMS/GETALBUM'
const DELETE_ALBUM = 'ALBUM/DELETEALBUM'
const UPDATE_ALBUM = 'ALBUM/UPDATEALBUM'


/* --Get all Albums-- ------------------------------------------------------------------------ */

//action
const getAllAlbums = (albums) => {
    return {
        type: GET_ALL_ALBUMS,
        albums
    }
}


//thunk
export const fetchAllAlbums = () => async dispatch => {
    const response = await fetch('/api/albums')

    if (response.ok) {
        const data = await response.json()
        dispatch(getAllAlbums(data.albums))
        return data.albums
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}



/* --Get Albums by Tag-- -------------------------------------------------------------------- */

//action
const getAlbumsByTag = (albums) => {
    return {
        type: GET_ALBUM_BY_TAG,
        albums
    }
}


//thunk
export const fetchAlbumsByTag = (tag_name) => async dispatch => {
    const response = await fetch(`/api/albums/${tag_name}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getAlbumsByTag(data.albums))
        return data.albums
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}


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
        return data
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

        if (data.Errors) return data

        dispatch(createAlbum(data.album))
        return data
    }
}

/* UPDATE ALBUM-- ------------------------------------------------------------ */

//action
const updateAlbum = (album) => {
    return {
        type: UPDATE_ALBUM,
        album

    }
}

export const fetchUpdateAlbum = (album_id, payload) => async dispatch => {
    const response = await fetch(`/api/albums/${album_id}`, {
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

        dispatch(updateAlbum(data.album))
        return data.album
    }
}

/* --DELETE ALBUM-- ----------------------------------------------------------- */

//action
const deleteAlbum = (album_id) => {
    return {
        type: DELETE_ALBUM,
        album_id
    }
}

//thunk
export const fetchDeleteAlbum = (album_id) => async dispatch => {
    const response = await fetch(`/api/albums/${album_id}`, {
        method: "Delete"
    })

    if (response.ok) {
        const data = await response.json()

        if (data.Errors) {
            return data.Errors
        }
        dispatch(deleteAlbum(album_id))
        return data
    }
}





/* --Reducer-- ---------------------------------------------------------------- */


const albums = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case GET_ALL_ALBUMS:
            const allAlbums = action.albums.map(album => {
                newState[album.id] = album
            })
            return newState

        case POST_ALBUM:
            newState[action.album.id] = action.album
            return newState

        case UPDATE_ALBUM:
            newState = { ...state }
            newState[action.album.id] = action.album

        case GET_ALBUM:
            newState = action.album
            return newState

        case GET_ALBUM_BY_TAG:
            const albumsByTag = action.albums.map(album => {
                newState[album.id] = album
            })
            return newState

        case DELETE_ALBUM:
            newState = { ...state }
            delete newState[action.album_id]
            return newState


        default:
            return state;
    }
}

export default albums
