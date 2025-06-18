import { useEffect, useState } from "react";

function BasicUseEffect() {
  const [count, setCount] = useState(0);

  /*
  Side Effect: In this example, useEffect is used to update the document title whenever count changes.
  Dependency Array: The effect will run only when the value of count changes,
  preventing unnecessary updates.
  */
  useEffect(() => {
    console.log(`useEffect called with count: ${count}`);
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-2">
      <p>You clicked {count} times</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCount(prev => prev + 1)}
      >Click me</button>
    </div>
  )
}

export default BasicUseEffect