import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = () => {
  return (


<div   className='shadow-xl bg-white border border-gray-100 cursor-pointer p-5 rounded-md '            >

<div>
  <h1    className='text-lg font-medium'         >Company Name</h1>
<p  className='text-gray-500 text-sm'        >India</p>
</div>

<div>

    <h1  className='font-bold text-lg my-2'            >Job Title</h1>
    <p    className='text-sm text-gr'         >Lorem ipsum dolor sit amet consectetur adipisicing elit.   Lorem ipsum dolor sit amet.      </p>
</div>





<div   className='flex items-center gap-2 mt-4 '          >


<Badge    className='font-bold text-blue-700'     variant="ghost"    >       
    12 Positions
</Badge>

<Badge    className='font-bold text-[#F83002]'     variant="ghost"    >       
    Part Time
</Badge>

<Badge    className='font-bold text-[#7209b7]'     variant="ghost"    >       
    24LPA
</Badge>


</div>





</div>



  )
}

export default LatestJobCards