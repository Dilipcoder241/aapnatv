import React from 'react'
import { Link } from 'react-router-dom';

function Header({wallpaper}) {
    
    
  return (
    <div className='flex flex-col w-full items-start justify-end h-[50vh] lg:h-[70vh] mt-5 p-[3%]' style={{background:`linear-gradient(rgba(0,0,0,.2) , rgba(0,0,0,.2)) , url(https://image.tmdb.org/t/p/original/${wallpaper?.backdrop_path || wallpaper?.poster_path}) no-repeat center /cover`}}>
        <h1 className='text-3xl lg:text-5xl font-bold capitalize'> {wallpaper?.original_name || wallpaper?.name || wallpaper?.title || wallpaper?.original_title}</h1>
        <p className='my-2 leading-4 lg:leading-normal w-[60%]'>{wallpaper?.overview.slice(0,100)}...</p>
        <p className='capitalize'>{`This ${wallpaper?.media_type} Comming ON-> ${wallpaper?.release_date? wallpaper?.release_date:"Comming Soon"}  `}</p>
        <Link to={`/${wallpaper?.media_type}/details/${wallpaper.id}/trailer`} className='bg-[#6556CD] hover:bg-[#5142b1] py-2 rounded px-4 mt-2'>Watch Trailer</Link>   
    </div>
  )
}

export default Header;