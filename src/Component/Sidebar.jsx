import React, { useEffect, useState } from 'react';
import { PiTelevisionBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { RiFireFill } from "react-icons/ri";
import { PiShootingStarThin } from "react-icons/pi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BsInfoCircleFill } from "react-icons/bs";
import { MdLocalPhone } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";


function Sidebar() {
  const [show, setShow] = useState(false);
  const handletoggle = () => {
    setShow(!show);
  }



  return show ? (
    <div className="absolute sidebar w-[90%] sm:w-[40%] md:w-[40%] h-[100%] z-50 bg-[#1F1E24] lg:w-[30%] border-r-2 border-zinc-500 p-3 flex flex-col justify-between">
      <div>

        <div className='flex justify-between'>
          <Link to="/" className='text-2xl flex items-center gap-2 text-white'><PiTelevisionBold color='#6556CD' /> Aapna Tv</Link>
          <button onClick={() => { setShow(false) }} className='text-2xl'><RxCross2 /></button>
        </div>


        <nav className='flex flex-col'>
          <h1 className='text-xl mt-10 mb-1'>New Feed</h1>
          <hr className='mb-5 border-zinc-600' />
          <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200' to="./trending"><RiFireFill /> Trending</Link>
          <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200' to="./popular"><PiShootingStarThin /> Popular</Link>
          <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200' to="./movies"><RiMovie2Line /> Movies</Link>
          <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200' to="./tvshow"><PiTelevisionSimpleBold /> Tv Shows</Link>
          <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200' to="./people"><MdGroups /> People</Link>
        </nav>
      </div>

      <div>
        <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200'><BsInfoCircleFill /> About Us</Link>
        <Link className='flex items-center gap-3 text-zinc-400 px-4 py-3 hover:bg-[#6556CD] rounded-lg hover:text-white duration-200' to="/contactUs"><MdLocalPhone /> Contact Us</Link>
      </div>
    </div>
  ) : (<button onClick={handletoggle} className='absolute text-2xl left-2 top-4'><HiMenuAlt1 /></button>)
}

export default Sidebar;