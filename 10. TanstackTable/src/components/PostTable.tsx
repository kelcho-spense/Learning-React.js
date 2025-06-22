import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useSort } from "@table-library/react-table-library/sort";
import Error from "./Error";

export interface TPost {
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<TPost[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

function PostTable() {
//     const colorTheme = {
//     BaseRow: `
//         color: #141414;
//       `,
//     Row: `
//         &:hover {
//           color: orange;
//         }

//         cursor: pointer;
//       `,
//   };

//   const stripedTheme = {
//     BaseRow: `
//         font-size: 14px;
//       `,
//     HeaderRow: `
//         background-color: #eaf5fd;
//       `,
//     Row: `
//         &:nth-of-type(odd) {
//           background-color: #d2e9fb;
//         }

//         &:nth-of-type(even) {
//           background-color: #eaf5fd;
//         }
//       `,
//   };

//   const marginTheme = {
//     BaseCell: `
//         margin: 9px;
//         padding: 11px;
//       `,
//   };
//     const theme = useTheme([colorTheme, stripedTheme, marginTheme]);
 const theme = useTheme(getTheme());    
const [search, setSearch] = useState("");

    const { data: posts, error } = useSuspenseQuery<TPost[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    // Filter posts based on search
    const filteredData = useMemo(() => ({
        nodes: posts ? posts.filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.body.toLowerCase().includes(search.toLowerCase())
        ) : [],
    }), [posts, search]);

    // Pagination setup
    const pagination = usePagination(filteredData, {
        state: {
            page: 0,
            size: 10, // Show 10 posts per page
        },
        onChange: onPaginationChange,
    });

    // Sorting setup
    const sort = useSort(
        filteredData,
        {
            onChange: onSortChange,
        },
        {
            sortFns: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ID: (array) => array.sort((a: any, b: any) => a.id - b.id),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                TITLE: (array) => array.sort((a: any, b: any) => a.title.localeCompare(b.title)),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                BODY: (array) => array.sort((a: any, b: any) => a.body.localeCompare(b.body)),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                CHARACTER_COUNT: (array) => array.sort((a: any, b: any) => a.body.length - b.body.length),
            },
        }
    );

    function onPaginationChange(action: unknown, state: unknown) {
        console.log(action, state);
    }

    function onSortChange(action: unknown, state: unknown) {
        console.log(action, state);
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const COLUMNS = [
        {
            label: "ID",
            renderCell: (item: TPost) => item.id.toString(),
            sort: { sortKey: "ID" },
        },
        {
            label: "Title",
            renderCell: (item: TPost) => (
                <div className="max-w-xs truncate" title={item.title}>
                    {item.title}
                </div>
            ),
            sort: { sortKey: "TITLE" },
        },
        {
            label: "Body",
            renderCell: (item: TPost) => (
                <div className="max-w-md truncate" title={item.body}>
                    {item.body}
                </div>
            ),
            sort: { sortKey: "BODY" },
        },
        {
            label: "Character Count",
            renderCell: (item: TPost) => item.body.length.toString(),
            sort: { sortKey: "CHARACTER_COUNT" },
        },
    ];

    return (
        <div className="p-4">
            <div className="mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search Posts:
                </label>
                <input
                    id="search"
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search by title or content..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="overflow-x-auto">
                <CompactTable
                    columns={COLUMNS}
                    data={filteredData}
                    theme={theme}
                    pagination={pagination}
                    sort={sort}
                />
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-500">
                    Total Pages: {pagination.state.getTotalPages(filteredData.nodes)} |
                    Showing {filteredData.nodes.length} of {posts.length} posts
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Page:</span>
                    <div className="flex gap-1">
                        {pagination.state.getPages(filteredData.nodes).map((_: unknown, index: number) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => pagination.fns.onSetPage(index)}
                                className={`px-3 py-1 text-sm rounded transition-colors ${pagination.state.page === index
                                    ? 'bg-blue-500 text-white font-semibold'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostTable