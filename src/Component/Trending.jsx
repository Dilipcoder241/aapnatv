import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import axios from '../Utils/axios';
import Loader from "./Loader"
import InfiniteScroll from 'react-infinite-scroll-component';

function Trending() {
    const navigate = useNavigate();
    const [Movies, setMovies] = useState([]);
    const [category, setCategory] = useState("all");
    const [Duration, setDuration] = useState("day");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = `Aapna Tv | Trending`;

    const getMovies = async () => {
        let { data } = await axios.get(`/trending/${category}/${Duration}?page=${page}`);
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
            getMovies();
            setPage(1);
        }
    }

    useEffect(() => {
        refereshHandler();
    }, [category, Duration])

    return Movies.length > 0 ? (
        <div className='w-full p-4 bg-[#1F1E24]'>
            <div className="top flex flex-col md:flex-row items-center gap-4">
                <h1 className='flex items-center gap-4 text-2xl'><FaArrowLeft onClick={() => { navigate(-1) }} className='hover:text-[#6556CD] duration-100' /> Trendings</h1>
                <div className='flex flex-col sm:flex-row items-center gap-5 w-[100%]'>
                    <div className='w-[100%] sm:w-[70%]'>
                        <SearchBar />
                    </div>
                    <div className='flex gap-4'>
                        <Dropdown title="Category" options={["all", "movie", "tv"]} func={(e) => { setCategory(e.target.value) }} />
                        <Dropdown title="Duration" options={["day", "week"]} func={(e) => { setDuration(e.target.value) }} />
                    </div>
                </div>
            </div>

            <div className='w-full bottom mt-[3%]'>
                <InfiniteScroll
                    dataLength={Movies.length}
                    next={getMovies}
                    loader={<h4>Loading...</h4>}
                    hasMore={hasMore}
                >
                    <Card data={Movies} />
                </InfiniteScroll>
            </div>
        </div>
    ) : (<Loader />)
}

export default Trending;