import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import NotFound from './NotFound';

function Trailer() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const category = pathname.includes("movie")?"movie":"tv"
    const ytvideo = useSelector(state => state[category].info);
    console.log();
    return (
        <div className={`w-[95vw] h-[95vh] absolute top-5 left-1/2 -translate-x-1/2  bg-[#221b4a] rounded`}>
            <RxCross2 className='text-3xl absolute -right-3 -top-3 cursor-pointer duration-100 bg-red-600 rounded-full p-1' onClick={() => { navigate(pathname.split("/").slice(0,-1).join("/")) }} />
            <div className='overflow-hidden w-[95vw] h-[95vh]'>
                {ytvideo.videos ? <ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideo.videos.key}`} width={"100%"} height={"100%"} playing={true} controls={true} /> : <NotFound />}
            </div>
        </div>
    )
}

export default Trailer;