import React from 'react'

function Dropdown({title,options,func}) {
  return (
    <select onChange={func} name="category" defaultValue="0" className='text-white min-w-[14vw] rounded bg-[#333339] px-2 py-1'>
            <option value="0" disabled className='hidden'>{title}</option>
            {options.map((o,i)=>(
              <option key={i} value={o}>{o.toUpperCase()}</option>
            ))}
          </select>
  )
}

export default Dropdown;