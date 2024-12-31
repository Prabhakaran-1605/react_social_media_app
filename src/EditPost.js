import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Missing from './Missing'
import DataContext from './context/DataContext'

const EditPost = () => {
    const {posts,setEditBody,setEditTitle,editBody,editTitle,handleEdit} = useContext(DataContext)
    const {id} = useParams()

    const post = posts.find((post)=>(post.id).toString() === id)

    useEffect( ()=>{
        if (post){
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    },[post,setEditBody,setEditTitle] )


  return (
    <main className='NewPost'>
    { editTitle && 
    <>
        <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e)=> e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
            id="postTitle"
            type="text"
            required
            value={editTitle}
            onChange={(e)=>{
            setEditTitle(e.target.value)
            }}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
            id="postBody"
            type="text"
            required
            value={editBody}
            onChange={(e)=>{
                setEditBody(e.target.value)
            }}
            />
            <button type='submit' onClick={()=> handleEdit(post.id)}>Submit</button>
                
            </form>
    </>          
    }
    {!editTitle &&
    <>
        <Missing/>
    </>

    }

    </main>
  )
}

export default EditPost