'use client'
 
import { useEffect } from 'react'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}
 
export default function Error({ error, reset }: ErrorProps) {


  useEffect(() => {
    console.error(error)
  }, [error]);
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-12">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-700 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}