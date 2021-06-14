import React, {useState, useRef} from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import axios from "axios";

function FileUpload({postContent, setPostContent}) {
    const [Images, setImages] = useState([]);
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();


    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1);
        setImages(newImages);
    };


    const onImgChange = (event) => {
        if (event.target.files !== null) {
            const formData = new FormData();
            const config = {
                headers: {'content-type': 'multipart/form-data'},
                withCredentials: true
            }
            formData.append('images', event.target.files[0]);
            axios.post(`https://api.challenchallen.com/api/challen/upload`, formData, config)
                .then(response => {
                        setAttachment(response.data[0])
                    setPostContent({...postContent,
                        fileUrl: response.data[0]})
                    }
                )


        }

    }


    return (
        <div style={{display: "flex", justifyContent: "space-around", margin: "2vh auto"}}>

            <div
                style={{
                    width: 150,
                    height: 150,
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}

            >
                <label htmlFor="input-file">
                    <AiOutlinePlus size={60} style={{cursor:'pointer'}}/>
                </label>
                <input id="input-file" style={{opacity: 0, width: 0,}} type="file" accept="image/*" ref={fileInput}
                       onChange={onImgChange}/>

            </div>

            {attachment !== "" && (<div
                style={{
                    display: "flex",
                    width: "150px",
                    height: "150px",
                    overflow: "hidden",
                }}
            >

                <div>
                    {postContent.fileUrl &&
                    <img
                        style={{minWidth: "150px", width: "150px", height: "150px"}}
                        src={`https://api.challenchallen.com/${attachment}`}
                    />
                    }
                </div>

            </div>)
            }


        </div>
    );
}

export default FileUpload;