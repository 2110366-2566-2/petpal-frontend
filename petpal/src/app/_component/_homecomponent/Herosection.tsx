"use client"
import Image from 'next/image'
import React from 'react'
import BasicButton from '../BasicButton'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Herosection() {

    const imageStyle = {
        borderRadius: '10%',
        border: '1px solid #fff',
      }

  return (
    <div className='flex flex-col min-[900px]:flex-row justify-center items-center p-10 gap-20 bg-[#FAF8ED]'>
        <motion.div className='flex flex-col gap-y-10'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}>
            <div className='text-orange text-7xl font-bold'>
                PETPAL
            </div>
            <div className='text-[#4f4f4f] text-2xl font-semibold'>
                Find pet care services for your little pals.
            </div>
            <div className='w-[40%]'>
                <Link href='./listing'>
                    <BasicButton name={'Start now'}/>
                </Link>
            </div>
      
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
        >
            <Image 
                alt='catndog' 
                src='/catndog.jpg'  
                width={500}
                height={500}
                style={imageStyle}
            />
        </motion.div>
    </div>
  )
}
