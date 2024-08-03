import React from 'react'

export default function ListSkeleton() {
  return (
    
        <div role="status" className="w-full animate-pulse">
            <div className="h-7 bg-primary-dark rounded-lg  w-full mb-4"></div>
            <div className="h-7 bg-primary-dark rounded-lg  w-full mb-2.5"></div>
            <div className="h-7 bg-primary-dark rounded-lg  w-full mb-2.5"></div>
            <div className="h-7 bg-primary-dark rounded-lg  w-full mb-2.5"></div>
            <div className="h-7 bg-primary-dark rounded-lg  w-full mb-2.5"></div>
            <div className="h-7 bg-primary-dark rounded-lg  w-full"></div>
            <span className="sr-only">Loading...</span>
        </div>


  )
}
