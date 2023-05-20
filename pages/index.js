import Head from 'next/head'
import Blok from '../components/Blok'
// import Image from 'next/image'
import { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';

const Home = () => {
  let imga = ["slider-3.jpg", "imgs-1.png", "slider-1.png"]
  let linka = ["tshirt", "mugs", "hoodies"]
  const [count, setcount] = useState(0)
  const sli = () => {
    if (count === (imga.length - 1)) {
      setcount(0);
    }
    else {
      setcount(count + 1);
    }
  }


  return (
    <>
      <Head>
        <title>OnlineShop</title>
        <meta name="Shop" content="Digital shoping shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className='inline absolute top-36 md:top-56 cursor-pointer  md:left-10 text-white' onClick={sli}><ArrowBackIosNewIcon /></div>
        <div className='inline absolute top-36 cursor-pointer md:top-56 right-0  md:right-10 text-white ' onClick={sli}><ArrowForwardIosIcon /></div>
        <Link href={`${process.env.NEXT_PUBLIC_HOST}/${linka[count]}`}>
          <img src={`${imga[count]}`} alt="home_image" className='w-screen md:h-96 h-44' />
        </Link>
      </div>
      <div>
        <div className='lg:flex'>
          <div className='flex'>
            <div className='border'>
              <img src={`freed.webp`} alt="home_image" className='w-screen' />
            </div>
            <div className='border'>
              <img src={`mugsimg.webp`} alt="home_image" className='w-screen' />
            </div>
          </div>
          <div className='flex'>
            <div className='border'>
              <img src={`banner-3_1.webp`} alt="home_image" className='w-screen' />
            </div>
            <div className='border'>
              <img src={`banner-3_2.webp`} alt="home_image" className='w-screen' />
            </div>
          </div>

        </div>
      </div>
      <Blok />
    </>
  )
}

export default Home;
