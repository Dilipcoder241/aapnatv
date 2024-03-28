import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncLoadPerson, removePerson } from '../Store/actions/PeopleAction';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEarthAmericas, FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Loader from './Loader';
import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown"

function PeopleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info } = useSelector(state => state.person);
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncLoadPerson(id));

    return () => {
      dispatch(removePerson())
    }
  }, [id])

  return info ? (
    <div className='relative w-[100%] min-h-screen px-[5%]' style={{ background: `linear-gradient(rgba(0,0,0,.2) , rgba(0,0,0,.2)) , url(https://image.tmdb.org/t/p/original/${info?.detail.backdrop_path || info?.detail.poster_path}) no-repeat top /cover` }}>
      <nav className='w-full text-zinc-100 flex  gap-10 text-lg h-[10vh] items-center'>
        <FaArrowLeft onClick={() => { navigate(-1) }} className='hover:text-[#6556CD] duration-100 text-xl' />
      </nav>

      <div className='w-full flex gap-5 flex-col md:flex-row'>
        <div className='w-[100%] md:w-[20%]'>
          <div className=''>
            <img src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`} alt="" className='max-h-[80vh] md:h-[50vh] max-w-[55vh] w-[90vw] md:w-auto object-cover rounded-md mx-auto' />
            <h1 className='mt-2 text-xl font-bold'>{info.detail.name}</h1>
            <hr className='mb-4' />
          </div>
          <div className='flex items-center gap-5 text-2xl'>
            {info.externalIds.wikidata_id && <a target='_blank' href={`http://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} > <FaEarthAmericas /></a>}
            {info.externalIds.instagram_id && <a target='_blank' href={`http://www.instagram.com/${info.externalIds.instagram_id}`}> <FaInstagram /></a>}
            {info.externalIds.facebook_id && <a target='_blank' href={`https://www.facebook.com/${info.externalIds.facebook_id}`}> <FaFacebook /></a>}
            {info.externalIds.twitter_id && <a target='_blank' href={`https://www.twitter.com/${info.externalIds.twitter_id}`}> <FaXTwitter /></a>}
          </div>

          <div className='mt-5 text-xl font-semibold text-zinc-400 space-y-1'>
            <h1>Known For : {info.detail.known_for_department}</h1>
            <h1>Gender : {info.detail.gender == 2 ? "Male" : "Female"}</h1>
            <h1>DOB : {info.detail.birthday}</h1>
            {info.detail.deathday && <h1>Date of Death : {info.detail.deathday} </h1>}
            <h1>Place of Birth : {info.detail.place_of_birth}</h1>
          </div>
        </div>

        <div className='w-[100%] md:w-[80%]'>
          <h1 className='text-5xl font-black'>{info.detail.name}</h1>
          <h1 className='text-2xl mt-3'>Biography</h1>
          <p className='text-zinc-400'>{info.detail.biography}</p>

          <h1 className='text-lg mt-4'>Summary</h1>
          <HorizontalCards Movies={info.combinedCredits.cast} />

          <div className='flex w-full justify-between mt-5'>
            <h1 className='text-2xl font-semibold'>Acting</h1>
            <Dropdown title="Filter" options={["movie", "tv"]} func={(e) => setCategory(e.target.value)} />
          </div>

          <div className='mb-10 mt-5 h-[40vh] overflow-y-auto overflow-x-hidden text-zinc-400 p-2 shadow-[rgba(255,_255,_255,_0.64)_0px_3px_8px]'>
           {info[category + "Credits"].cast.map((c,i)=>(
             <li key={i} className='hover:text-white my-2'>
             <Link to={`/${category}/details/${c.id}`}>
             <span>{category.toUpperCase()} {category=="movie"?"NAME":"Show"} :{c.name || c.title || c.original_name || c.original_title}</span>
             <span className='block ml-5'>Role Played: {c.character}</span>
             </Link>
           </li>
           ))}
          </div>
        </div>

      </div>

    </div>
  ) : (<Loader />)
}

export default PeopleDetail;