'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6">
          We encountered an unexpected error. Please try again later.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <strong>Error Message:</strong> {error.message}
        </p>
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
