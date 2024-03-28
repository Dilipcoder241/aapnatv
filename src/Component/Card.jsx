import React from 'react'
import { Link } from 'react-router-dom'
import noimg from "/noimg.jpg"

function Card({ data , title}) {
    return (
        <div className='flex gap-4 flex-wrap lg:justify-evenly justify-center'>
            {data.map((m, i) => (
                <Link to={`/${m.media_type || title}/details/${m.id}`} key={i} className='lg:w-[40vh] mb-[5%] relative'>
                    <img src={m?.backdrop_path || m?.poster_path || m.profile_path?`https://image.tmdb.org/t/p/original/${m?.backdrop_path || m?.poster_path || m.profile_path}`:noimg} alt="" className='h-[30vh] lg:h-[50vh] object-cover' />
                    <h1 className='text-xl font-semibold'>{m.name || m.title}</h1>
                    {m.vote_average && <div className='text-xl font-semibold'>
                        <p>Ratings : {(m.vote_average*10).toFixed() }<span>%</span></p>
                    </div>}
                </Link>
            ))}

        </div>
    )
}

export default Card;