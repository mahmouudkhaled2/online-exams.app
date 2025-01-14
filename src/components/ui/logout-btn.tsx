'use client';

import { useState } from 'react';

export default function LogoutButton() {

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {

    setIsLoggingOut(true); // Show loading state

    try {
        const response = await fetch('/api/logout', { method: 'POST'});

        // If response is ok go to the login page

        if (response.ok) {
            window.location.href = '/auth/login'; 
        } 
        else {
            console.error('Logout failed, Try again');
        }
    } 

    catch (error) {
      console.error('Logout error:', error);
    } 

    finally {
      setIsLoggingOut(false);
    }

  };


  return (

    <div className="flex gap-10  items-center py-1 px-3 mt-10 text-xl font-semibold text-sub-color">
        <i className="fa-solid fa-right-from-bracket rotate-180 text-main"></i>
        <button onClick={handleLogout} disabled={isLoggingOut} >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
    </div>
   
  );
}
