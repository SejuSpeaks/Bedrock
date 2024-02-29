import { fetchCreateSong } from "../../store/songs"

export const addSongs = async (dispatch, album, files, songNames, setLoading, FormData) => {

    if (files.length) {
        setLoading(true)

        for (let i = 0; i <= files.length - 1; i++) {
            //create song object
            const formData = new FormData()
            formData.append('name', songNames[i])
            formData.append('song_file', files[i])



            //dispatch song to specific album already created
            await dispatch(fetchCreateSong(album.album.id, formData))
        }

        setLoading(false)
        return
    }
}

//  1    2    3    4
// song song onsg song
//  0    1    2     3    4   5
