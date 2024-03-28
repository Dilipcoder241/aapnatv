import React from 'react'
import { Link } from 'react-router-dom';
import noimg from "/noimg.jpg";

function HorizontalCards({ Movies , title }) {
    return (
        <div className='h-[35vh] md:h-[35vh] lg:h-[40vh] w-full p-4 flex overflow-x-scroll gap-3 '>
            {Movies.map((m, i) => (
                <Link to={`/${m.media_type?m.media_type:title}/details/${m.id}`} key={i} className='h-[100%] w-[70%] md:w-[50%] lg:w-[35%] flex-shrink-0 rounded-sm overflow-hidden group relative'>
                    <img src={m.backdrop_path || m?.poster_path ? `https://image.tmdb.org/t/p/original/${m?.backdrop_path || m?.poster_path }`:noimg} alt="" className='w-full h-full object-cover'/>
                    <div className='lg:group-hover:bg-[#0000007b] bg-[#0000007b] lg:group-hover:bottom-0  absolute bottom-0 lg:-bottom-[100%] duration-500 p-2 w-full'>
                        <h1 className='text-sm sm:text-xl font-semibold '>{m.name || m.title}</h1>
                        {m.overview && <p className='hidden lg:block text-sm leading-tight mt-4'>{m.overview.slice(0,150)}...</p>}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default HorizontalCards;