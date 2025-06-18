import React, { useEffect, useRef, useState } from 'react'
/*
The useRef Hook can also be used to keep track of previous state values.
This is because we are able to persist useRef values between renders.
*/

function TrackingState() {
    const [inputValue, setInputValue] = useState("");
    const previousInputValue = useRef("");

    useEffect(() => {
        previousInputValue.current = inputValue;
    }, [inputValue]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <input
            className='border border-gray-300 rounded p-2 w-full max-w-md mb-4'
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <h2>Current Value: {inputValue}</h2>
            <h2>Previous Value: {previousInputValue.current}</h2>
        </div>
    )
}

export default TrackingState