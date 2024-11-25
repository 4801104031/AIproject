import React from 'react'
import { cn } from "@/lib/utils"

type Props = {
  value: number
}

const ProgressBar = ({ value }: Props) => {
  return (
    <div className='w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner'>
      <div 
        className={cn(
          'h-full rounded-full transition-all duration-500 ease-out relative',
          value < 33 ? 'bg-red-500' : value < 66 ? 'bg-yellow-500' : 'bg-green-500'
        )}
        style={{
          width: `${value}%`
        }}
      >
        <div className="absolute inset-0 bg-white opacity-25 animate-pulse"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-[200%] animate-shine bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

