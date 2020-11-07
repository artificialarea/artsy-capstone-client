import { useState } from "react"
import PostApiService from "../services/post-api-service"
import Nav from './Nav'

export default function Post(props){
    const [post, set] = useState({})

    const uploadImage = () => {
        console.log('upload img')
    }

    const updatePost = (e) => {
        e.preventDefault()
        const {id, value} = e.target
        return set({...post, [id]:value})
    }
    const submitPost = () => {
        const { title, description } = post
        const image = 'url' // placeholder till cloudinary integration

        PostApiService.postPost(title, description, image)
            .then(() => {
                set({})
                return cancel()
            })
            .catch()
    }
    const cancel = () => {
        return props.history.goBack()
    }
    
    return(
        <>
            <Nav />
                    <div className="upload">
                        <div className="box upload-box">
                            <button onClick={() => uploadImage()}>Upload Image</button>
                        </div>
                        <div>
                            <div className="upload-inputs">
                                <label htmlFor="title">Title:</label>
                                <input type="text" id="title" className="post-input" placeholder="" onChange={(e) => updatePost(e)} required/>
                            </div>
                            <div className="upload-inputs">
                                <label htmlFor="description">Description:</label>
                                <input type="text" id="description" className="post-input" placeholder="" onChange={(e) => updatePost(e)} required/>
                            </div>
                            
                        </div>
                        <div className="actions">
                            <button onClick={() => cancel()}>Cancel</button>
                            <button onClick={() => submitPost()}>Add Post</button>
                        </div>
                    </div>
            <footer>Footer</footer>
        </>
    )
}