import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import axios from '../Utils/axios';
import Loader from "./Loader"
import InfiniteScroll from 'react-infinite-scroll-component';

function Movies() {
    const navigate = useNavigate();
    const [Movies, setMovies] = useState([]);
    const [category, setCategory] = useState("now_playing");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = `Aapna Tv | Movies`;


    const getMovies = async () => {
        let { data } = await axios.get(`/movie/${category}?page=${page}`);
        if (data.results.length > 0) {
            setMovies((prev) => [...prev, ...data.results]);
            setPage(prev => prev + 1);
        }
        else {
            setHasMore(false);
        }
    }


    const refereshHandler = () => {
        if (Movies.length == 0) {
            getMovies();
        }
        else {
            setMovies([]);
            setPage(1);
            getMovies();
        }
    }

    useEffect(() => {
        refereshHandler();
    }, [category])

    return Movies.length > 0 ? (
        <div className='w-full p-4 bg-[#1F1E24]'>
            <div className="top flex flex-col sm:flex-row items-center gap-4">
                <h1 className='flex items-center gap-4 text-2xl'><FaArrowLeft onClick={() => { navigate(-1) }} className='hover:text-[#6556CD] duration-100' /> Movies</h1>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-5 w-[100%] '>
                    <div className='w-[100%] sm:w-[70%]'>
                        <SearchBar />
                    </div>
                    <Dropdown title="Category" options={["now_playing", "popular", "top_rated", "upcoming"]} func={(e) => { setCategory(e.target.value) }} />
                </div>
            </div>

            <div className='w-full bottom mt-[3%]'>
                <InfiniteScroll
                    dataLength={Movies.length}
                    next={getMovies}
                    loader={<h4>Loading...</h4>}
                    hasMore={hasMore}
                >
                    <Card data={Movies} title="movie" />
                </InfiniteScroll>
            </div>
        </div>
    ) : (<Loader />)
}

export default Movies