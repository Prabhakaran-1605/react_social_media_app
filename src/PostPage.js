import { useParams } from "react-router-dom";
import Missing from "./Missing";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
const PostPage = () =>{
    const {posts,handleDelete} = useContext(DataContext)
    const {id} = useParams()
    const post = posts.find((post)=>(post.id).toString() === id )
return (
    <main className="PostPage">
    <article className="post">
{post && 
    <>
        <h2>{post.title}</h2>
        <p className="postDate">{post.date}</p>
        <p className="postBody">{post.body}</p>
        <Link to={`/edit/${post.id}`}><button className="editButton" style={{backgroundColor: "green", marginRight: "10px"  }}>Edit Post</button></Link>
        <button className="deleteButton" onClick={()=>handleDelete(post.id)}>Delete Post </button>
    </>

}
{!post && 
<>
<Missing/>
</>
}
    </article>
     </main>

)
}

export default PostPage;