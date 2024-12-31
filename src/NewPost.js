import { useContext } from "react"
import DataContext from "./context/DataContext"

const NewPost = () =>{
    const { handleSubmit,postBody,postTitle,setPostTitle,setPostBody } = useContext(DataContext)
    return (
    <main className="NewPost">
    <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> Title: </label>
        <input 
         id="postTitle"
         type="text"
         required
         value={postTitle}
         onChange={(e)=>setPostTitle(e.target.value)}   
        />
        <label htmlFor="postBody">Post:</label>
        <input
         id="postBody"
         type="text"
         required
         value={postBody}
         onChange={(e)=> setPostBody(e.target.value)}   
        /> 
        <button type="submit">Submit</button>
    </form>

    </main>
)
}

export default NewPost