
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import Footer from './Footer';
import EditPost from './EditPost';
import { Routes,Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import About from './About';

function App() {
  return (
    <div className="App">
    <DataProvider>
      <Header title="Welcome to my Social Media"/>
      <Nav/>
      <Routes>
        {/* Home Route */}
        <Route path="/" 
        element={<Home 
        />} />

        {/* Nested Post Routes */}
        <Route path="post">
          <Route
            index
            element={
              <NewPost />
            }
          />
          <Route path=":id" element={<PostPage />} />
        </Route>
        <Route path="/edit/:id" element={<EditPost />}/>
        <Route Path="/about" element={<About/>} /> 

        {/* About Page 
        <Route path="about" element={<About />} />

        {/* Catch-All Route */}
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
      </DataProvider>
    </div>

  );
}

export default App;
