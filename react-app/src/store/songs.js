
const POST_ALBUM_SONG = '/ALBUMS/POSTSONG'



/* --Create Song-- ---------------------------------------------------------------------------- */

//action

const createSong = (song) => {
    return {
        type: POST_ALBUM_SONG,
        song
    }
}


export const fetchCreateSong = (id, payload) => async dispatch => {
    const response = await fetch(`/api/albums/${id}/songs`, {
        method: 'POST',
        // headers: {
        //     "Content-Type": "application/json",
        // },
        body: payload
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createSong(data.song))

        return data.song
    }
}





const songs_posted = (state = {}, action) => {
    switch (action.type) {
        case POST_ALBUM_SONG:
            const newState = { ...state }
            console.log('ACTION SONG', action.song)
            newState[action.song.id] = action.song
            return newState

        default:
            return state;
    }
}

export default songs_posted
