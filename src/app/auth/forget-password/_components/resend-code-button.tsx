'use client'

import { useState, useEffect } from 'react';
import { forgetPaswwordAction } from '../_actions/forget-password.action';

const ResendCodeButton = () => {

    // States
    const [isDisabled, setIsDisabled] = useState(false);
    const [timer, setTimer] = useState(10);
    
    // Function to handle sending the code
    const handleResendCode = async () => {
        
        const email = { email: localStorage.getItem('user') || '' };
        
        // Request to resend a code
        const payload = await forgetPaswwordAction(email);
        
        if ( payload.message === 'success' ) {
            
            // Disable the button
            setIsDisabled(true);

            // Start the countdown for re-enabling the button
            let countdown = 10;
            const interval = setInterval(() => {
            setTimer(countdown);
            countdown--;

            if (countdown < 0) {
                clearInterval(interval);
                setIsDisabled(false); // Re-enable the button after the countdown
                setTimer(10)
            }
        }, 1000);

        }  
    };

    useEffect(() => {
        // Cleanup timer when the component unmounts
        return () => {
            clearInterval(timer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <button 
            onClick={handleResendCode} 
            disabled={isDisabled}
            className={`${isDisabled ? 'text-zinc-600' : 'text-blue-800'}`}>
                {isDisabled ? `Resend in ${timer}s` : 'Resend Code'}
            </button>
        </div>
    );
};

export default ResendCodeButton;
