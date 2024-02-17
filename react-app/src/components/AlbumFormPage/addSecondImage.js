

export const fetchAddSecondImage = async (album, secondaryImage) => {
    const payload = {
        'album_id': album.album.id,
        'url': secondaryImage
    }

    const response = await fetch(`/api/albums/${album.album.id}/images`, {
        method: "Post",
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
        return data["image added"]
    }
}
