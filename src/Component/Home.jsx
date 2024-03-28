import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import Header from './Header'
import HorizontalCards from './HorizontalCards';
import axios from "../Utils/axios"
import Loader from './Loader';
import Dropdown from './Dropdown';

function Home() {

  const [wallpaper, setWallpaper] = useState(null);
  const [Movies, setMovies] = useState([]);
  const [category, setcategory] = useState("all");
  const getWallpaper = async () => {
    let { data } = await axios.get("/trending/all/day");
    setWallpaper(data.results[Math.floor(Math.random() * 15)]);
  }

  const getMovies = async () => {
    let { data } = await axios.get(`/trending/${category}/day`);
    setMovies(data.results);
  }


  useEffect(() => {
    getMovies();
    !wallpaper && getWallpaper();
  }, [category])

  return wallpaper?(
    <div className='h-screen flex '>
      <Sidebar />
      <div className='overflow-y-auto mt-2 overflow-x-hidden'>
        <SearchBar />
        <Header wallpaper={wallpaper} />
        <div className='px-5 py-3 flex justify-between'>
          <h1 className='text-lg lg:text-2xl'>Category: {category.toUpperCase()}</h1>
          <Dropdown title="Filter" options={["all" , "movie" , "tv"]} func={(e)=>{setcategory(e.target.value)}}/>
        </div>  
        <HorizontalCards Movies={Movies} />
      </div>
    </div>
  ):(<Loader/>)
}

export default Home;