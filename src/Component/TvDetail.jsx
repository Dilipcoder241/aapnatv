import React, { useEffect } from 'react'
import { useSelector  , useDispatch} from 'react-redux'
import { asyncLoadTv , removeTv } from '../Store/actions/TvAction';
import { useParams , useNavigate, Link, useLocation, Outlet } from 'react-router-dom';
import { FaArrowLeft, FaEarthAmericas, FaPlay } from 'react-icons/fa6';
import { FaExternalLinkAlt } from "react-icons/fa";
import Loader from './Loader';
import HorizontalCards from './HorizontalCards';

function TvDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {info} = useSelector(state=>state.tv);
  const {pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncLoadTv(id));

    return () => {
      dispatch(removeTv())
    }
  }, [id])
  return info?(
    <div className='relative w-screen min-h-screen px-[5%]' style={{ background: `linear-gradient(rgba(0,0,0,.6) , rgba(0,0,0,.6)) , url(https://image.tmdb.org/t/p/original/${info?.detail.backdrop_path || info?.detail.poster_path}) no-repeat top /cover` }}>
       <nav className='w-full text-zinc-100 flex  gap-10 text-lg h-[10vh] items-center'>
        <FaArrowLeft onClick={() => { navigate(-1) }} className='hover:text-[#6556CD] duration-100 text-xl' />
        <a target='_blank' href={`http://www.wikidata.org/wiki/${info.externalIds.wikidata_id}`} > <FaEarthAmericas /></a>
        <a target='_blank' href={info.detail.homepage}> <FaExternalLinkAlt /></a>
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalIds.imdb_id}`}> IMDB</a>
      </nav>

      <div className='w-full flex flex-col md:flex-row'>
        <img src={`https://image.tmdb.org/t/p/original/${info.detail?.poster_path || info?.detail.backdrop_path}`} alt="" className='max-h-[80vh] md:h-[50vh] max-w-[55vh] w-[90vw] md:w-auto object-cover rounded-md mx-auto' />


        <div className='content ml-4'>
          <h1 className='text-3xl md:text-5xl font-black '> {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}<span className='text-lg text-zinc-200'>({info.detail.first_air_date.split("-")[0]})</span> </h1>
          <div className='text-base font-semibold opacity-80'>
            <h1>Ratings : {(info.detail.vote_average * 10).toFixed()}<span>%</span></h1>
            <h1>Release Date : {info.detail.first_air_date}</h1>
            <h1>Tv Show Type : {info.detail.genres.map(g=>g.name).join(",")}</h1>
          </div>

          <h1 className='text-xl mt-4 font-semibold'>Overview </h1>
          <p className='opacity-80 leading-tight md:leading-normal'>{info.detail.overview}</p>

          <Link to={`${pathname}/trailer`} className='rounded-md bg-[#6556CD] px-4 py-3 mt-4 flex gap-2 items-center w-fit'> <FaPlay /> Play Trailer</Link>
        </div>
      </div>

      <div className='space-y-4 mt-4'>

        {info.watchProviders?.flatrate &&<div className='flex flex-col md:flex-row gap-5 items-center'>
          <h1 className='text-xl'>Available On Platform : </h1>
          <div className='flex gap-4'>
          {info.watchProviders?.flatrate?.map(w => (
            <img title={w.provider_name} key={w.provider_id} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" className='h-[6vh] w-[6vh] rounded-md object-cover' />
          ))}
        </div>
        </div>}

       {info.watchProviders?.rent && <div className='flex flex-col md:flex-row gap-5 items-center'>
          <h1 className='text-xl'>Available For Rent : </h1>
          <div className='flex gap-4'>
          {info.watchProviders?.rent?.map(w => (
            <img title={w.provider_name} key={w.provider_id} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" className='h-[6vh] w-[6vh] rounded-md object-cover' />
          ))}
        </div>
        </div>}

        {info.watchProviders?.buy && <div className='flex flex-col md:flex-row gap-5 items-center'>
          <h1 className='text-xl'>Available To Buy : </h1>
          <div className='flex gap-4'>
          {info.watchProviders?.buy?.map(w => (
            <img title={w.provider_name} key={w.provider_id} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" className='h-[6vh] w-[6vh] rounded-md object-cover' />
          ))}
          </div>
        </div>}

      </div>


      <h1 className='text-xl font-bold mt-5'>Seasons</h1>
      <hr/>
      {info.detail.seasons.length>0 ?<HorizontalCards Movies={info.detail.seasons}/>: <h1>no Seasons Available</h1>}


      {info.similar.length>0 && <><h1 className='text-xl font-bold mt-5'>Tv Shows You Might Also Enjoy</h1>
      <hr/>
       <HorizontalCards Movies={info.similar} title="tv" /></>}

      <Outlet/>
    </div>
  ):(<Loader/>)
}

export default TvDetail;