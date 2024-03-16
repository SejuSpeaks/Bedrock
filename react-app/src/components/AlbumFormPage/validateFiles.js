

export const validateFileTypes = (files) => {
    for (let file of files) {
        console.log('file in func', file)
        if (file.type !== 'audio/mpeg' && file.type !== 'audio/wav' && file.type !== 'audio/mp3') {
            console.log('file is not of type')
            return { "FileTypeError": "Upload Correct file type mp3/wav" }
        }
    }
    return 'ok';
}
