"use client"
import React from 'react'
import Featurecard from './Featurecard'
import { motion } from "framer-motion";

export default function Featuresection() {
  return (
    <motion.div className='flex flex-col min-[900px]:flex-row justify-center items-center min-[900px]:items-start gap-10 p-10 bg-[#FAF8ED]'
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.1,
    }}>
      <Featurecard 
        name='🏥 Healthcare' 
        description='ensure your pet is always in the best health. We offer regular check-ups, vaccinations, and emergency care.'
      />
      <Featurecard 
        name='✂️ Grooming' 
        description='keep your pet looking their best. We offer bathing, hair trimming, nail clipping, and more.'
      />
      <Featurecard 
        name='🚶 Pet walking' 
        description='provide your pet with regular exercise and socialization. Our experienced walkers ensure your pet has a fun and safe walk.'
      />
    </motion.div>
  )
}

