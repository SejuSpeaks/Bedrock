
const GET_ARTIST = '/ARTIST/GETARTIST'

//action
const get_artist = (artist) => {
    return {
        type: GET_ARTIST,
        artist
    }
}
//thunk
export const fetchGetArtist = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(get_artist(data))
        return data
    }
    else {
        const data = await response.json()
        return data.Errors
    }
}


const artist = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_ARTIST:
            newState = { ...action.artist }
            return newState

        default:
            return state;
    }
}

export default artist
