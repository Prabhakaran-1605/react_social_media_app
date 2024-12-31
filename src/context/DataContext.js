import { createContext,useState,useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";
import {format} from "date-fns";
import api from "../api/posts"

const DataContext = createContext({})

export const DataProvider = ({children})=>{
    const [posts,setPosts] = useState([])
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [postTitle,setPostTitle] = useState("")
    const [postBody,setPostBody] = useState("")
    const [editTitle,setEditTitle] = useState("")
    const [editBody,setEditBody] = useState("")
    const navigate = useNavigate()
    const {width} = useWindowSize()
    const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3500/posts")
  
  useEffect(()=>{
    setPosts(data)
  },[data])
  
    useEffect(()=>
    {
      const filteredResults = posts.filter((post)=>(((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase())
    ));
    setSearchResult(filteredResults.reverse())
    },[posts,search])
  
    const handleSubmit = async (e) =>{
      e.preventDefault();
      const id = posts.length ? Number(posts[posts.length-1].id) + 1 : 1;
      const date = format(new Date(), "MMMM dd, yyyy pp")
      const newPost = {id, title: postTitle, date, body:postBody}
      try
      {
          const response = await api.post("/posts",newPost)
          console.log(response,"checking post response")
          const allPost = [...posts, response.data]
          setPosts(allPost)
          setPostTitle("")
          setPostBody("")
          navigate("/")
      }
      catch(err){
          console.log(`Error: ${err.message}`)
      }
    }
  
    const handleEdit = async (id) => {
    const date = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = {id,title: editTitle, date, body:editBody};
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle("")
      setEditBody("")
      navigate("/")
    }
    catch(err){
    console.log(err.message)
    }
    }
  
    const handleDelete = async (id) =>{
    try{
      await api.delete(`posts/${id}`)
      const postList = posts.filter((post)=> post.id !==id)
      setPosts(postList )
      navigate("/")
    }
    catch(err){
      console.log(`Error: ${err.message}`)
    }
    }
    return (
        <DataContext.Provider 
        value={{
        width,
        search,setSearch,
        searchResult,isLoading,fetchError,
        handleSubmit,postBody,postTitle,setPostTitle,setPostBody,
        posts,handleDelete,
        setEditBody,setEditTitle,editBody,editTitle,handleEdit
        }}>
        {children }
        </DataContext.Provider>
    )
}

export default DataContext;