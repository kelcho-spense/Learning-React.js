import { useEffect, useState } from "react";

interface Data {
    id: number;
    title: string;
}

function FetchingData() {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(`Failed to fetch data - ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, on mount

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul>
            {data.map(item => (
                <li key={item.id} className="border p-2 mb-2">
                    <p>ID: {item.id}</p>
                    <h3 className="font-bold">{item.title}</h3>
                    <p>Content: {item.title}</p>
                </li>
            ))}
        </ul>
    )
}

export default FetchingData