"use client";

import FuzzyText from '@/components/anim/fuzzy-text'
import Link from 'next/link'

export default function NotFound() {
  return <div className='w-screen h-screen flex flex-col items-center justify-center  bg-gradient-to-br from-blue-500 via-blue-300 to-blue-100'>
      <FuzzyText 
        baseIntensity={0.1} 
        hoverIntensity={0.2} 
        enableHover={true}
        >
        404
        </FuzzyText>
        <div className="my-6"></div>
        <FuzzyText 
            baseIntensity={0.05} 
            hoverIntensity={0.1} 
            enableHover={true}
            fontSize={18}
            >
            Page Not Found
        </FuzzyText>
      <div className='mt-8'>
        <Link className='p-3 bg-blue-200 rounded-md' href="/">Back to Home</Link>
      </div>
  </div>
}