import React from 'react'

interface GreetingProps {
    name?: string;
    age?: number;
}

const OptionalProps: React.FC<GreetingProps> = ({ age, name }) => {
    return (
        <>
            <h1>Hello, {name}!</h1>
            {age && <p>You are {age} years old.</p>}
        </>
    )
}

export default OptionalProps