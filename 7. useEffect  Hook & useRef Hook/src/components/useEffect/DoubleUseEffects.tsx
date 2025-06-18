import { useEffect, useState } from 'react'

function DoubleUseEffects() {
    const [count, setCount] = useState<number>(0);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        console.log('Count changed:', count);
    }, [count]); // Effect only runs when `count` changes

    useEffect(() => {
        console.log('Text changed:', text);
    }, [text]); // Effect only runs when `text` changes

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100 gap-2'>
            <button 
            className='bg-green-500 text-white px-4 py-2 rounded'
            onClick={() => setCount(count + 1)}>Increment Count {count}</button>
            <input
                className='border p-2 rounded mt-2'
                type="text" value={text} onChange={e => setText(e.target.value)} />
        </div>
    );
}

export default DoubleUseEffects