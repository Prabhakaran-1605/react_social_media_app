import { useContext } from "react"
import Feed from "./Feed"
import DataContext from "./context/DataContext"
const Home = () =>{

    const {searchResult,isLoading,fetchError} = useContext(DataContext)
return (
    <main className="Home">
    {isLoading && <p className="statusMsg">Loading posts...</p>}
    {!isLoading && fetchError && (<p className="statusMsg" style={{color:"red", fontSize: "25px", fontWeight: "bold"}}><div style={{backgroundColor: "lightblue", padding: "10px"}}>{fetchError}</div></p>)}
    {!isLoading && !fetchError && (searchResult.length ? 
        (<Feed posts={searchResult}/>)
        : 
        (<p style={{marginTop:"2rem"}}>
        No Posts to display
        </p>))   
    }

    </main>
)
}

export default Home