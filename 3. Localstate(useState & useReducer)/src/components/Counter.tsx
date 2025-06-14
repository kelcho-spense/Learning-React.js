import { useState } from "react";


function Counter() {
    const [count, setCount] = useState<number>(0);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    return (
        <>
            <button onClick={increment}>Increment</button>
            <div>Counter : {count}</div>
            <button onClick={decrement}>Decrement</button>
            <br />
            <button onClick={() => setCount(0)}>Reset</button>
        </>
    )
}

export default Counter