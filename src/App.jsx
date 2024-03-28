import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Component/Home'
import Trending from './Component/Trending'
import Popular from './Component/Popular'
import Movies from './Component/Movie'
import TvShow from './Component/TvShow'
import People from "./Component/People"
import MovieDetail from "./Component/MovieDetail"
import TvDetail from  "./Component/TvDetail"
import PeopleDetail from './Component/PeopleDetail'
import Trailer from './Component/Trailer'
import NotFound from './Component/NotFound'
import Contact from './Component/Contact'


function App() {
  return (
    <div className='bg-[#1F1E24] w-[100%] flex text-white'>
       <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/trending' element={<Trending/>}/>
            <Route path='/popular' element={<Popular/>}/>
            <Route path='/movies' element={<Movies/>}/>
            <Route path='/contactUs' element={<Contact/>}/>
            <Route path='/movie/details/:id' element={<MovieDetail/>}>
              <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>
            </Route>
            <Route path='/tvshow' element={<TvShow/>}/>
            <Route path='/tv/details/:id' element={<TvDetail/>}>
              <Route path='/tv/details/:id/trailer' element={<Trailer/>}/>
            </Route>
            <Route path='/people' element={<People/>}/>
            <Route path='/people/details/:id' element={<PeopleDetail/>}/>



            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  )
}

export default App