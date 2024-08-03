import React from 'react'

export default function ReceiptSkeleton() {
  return (
    
        <div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-primary-dark rounded-full  w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-primary-light rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-primary-dark rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-primary-dark rounded-full  w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-primary-light rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-primary-light rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-primary-dark rounded-full  w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-primary-light rounded-full "></div>
                </div>
                <div className="h-2.5 bg-primary-dark rounded-full  w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-primary-dark rounded-full  w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-primary-light rounded-full "></div>
                </div>
                <div className="h-2.5 bg-primary-dark rounded-full  w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-primary-dark rounded-full  w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-primary-light rounded-full "></div>
                </div>
                <div className="h-2.5 bg-primary-dark rounded-full  w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>

  )
}
