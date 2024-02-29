import { fetchCreateAlbum } from "../../store/albums"

export const createAlbum = async (dispatch, title, cover, genre, description, release_date) => {

    const album = {
        "title": title,
        "cover": cover,
        "genre": genre,
        "description": description,
        "release_date": release_date
    }

    const createdAlbumData = dispatch(fetchCreateAlbum(album))
    return createdAlbumData;
}
