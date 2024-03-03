import { useModal } from "../../../context/Modal";


const ImageForm = ({ setImageUrl }) => {
    const { closeModal } = useModal()

    return (
        <div>
            <input onChange={(e) => setImageUrl(e.target.value)} placeholder="Image Url"></input>
            <button onClick={() => closeModal()}>Add</button>
        </div>
    )
}

export default ImageForm;
