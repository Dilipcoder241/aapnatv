import axios from '../Utils/axios';
import React, { useEffect, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setSearchData(data.results);
    } catch (error) {
      console.log("some error in searching moives");
    }
  }

  useEffect(() => {
    getSearch();
  }, [query])

  return (
    <>
    <div className='flex items-center px-2'>
    <div className='flex items-center ml-[8vw] w-[100%] text-2xl relative z-30'>
      <IoMdSearch className='cursor-pointer' />
      <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} placeholder='Search' className="w-[90%] md:w-[50%] lg:w-[70%] text-xl px-2 py-2 outline-none bg-transparent" />
      {query && <RxCross1 className='cursor-pointer' onClick={() => setQuery("")} />}

      {query && <div className="bg-[#323039] absolute top-[100%] left-0 lg:left-[4%] w-[80%] md:w-[50%] lg:w-[70%] max-h-[40vh] overflow-x-hidden overflow-y-auto rounded-lg">

        {searchData.map((item) => (
          <Link to={`/${item.media_type}/details/${item.id}`} key={item.id} className='p-2 border-b-2 border-zinc-500 w-full flex items-center gap-2 hover:bg-zinc-600 duration-200'>
            <img src={item.poster_path || item.backdrop_path || item.profile_path?`https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path || item.profile_path}`:'./noimg.jpg'} alt="" className='w-12 h-12 rounded object-cover ' />
            <span className='text-xl'>{item.name || item.original_title}</span>
          </Link>
        ))}
      </div>}
    </div>
    </div>

    </>
  )
}

export default SearchBar;