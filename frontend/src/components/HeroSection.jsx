import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div  className='text-center'>
<div   className='flex flex-col my-10 gap-5           '          >

<span    className='   mx-auto       rounded-full bg-gray-100 py-2 px-4 text-[#F83002]      font-medium'      >No. 1 Job Hunt Website</span>
<h1    className='font-bold text-5xl'         >Search,Apply &<br />Get Your <span   className='text-[#6A38C2]'    > Dream Jobs</span></h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo nisi reiciendis inventore quis iste?</p>


<div  className='flex shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto w-[40%]'         >
<input type="text" 
placeholder='Find your dream jobs'
className='outline-none w-full border-none '
/>

<Button    className='rounded-r-full  bg-[#6A38C2] '     >

<Search   
className='h-5 w-5 '
/>


</Button>
</div>


</div>



    </div>
  )
}

export default HeroSection