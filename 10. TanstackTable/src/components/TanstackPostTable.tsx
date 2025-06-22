
import React, { useState } from 'react';
import { useSuspenseQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type PaginationState,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/react-table';

export interface TPost {
    id: number;
    title: string;
    body: string;
}

const fetchPosts = async (): Promise<TPost[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
}

const columnHelper = createColumnHelper<TPost>();

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        size: 80,
        enableSorting: true,
    }),
    columnHelper.accessor('title', {
        header: 'Title',
        cell: info => (
            <div className="max-w-xs truncate" title={info.getValue()}>
                {info.getValue()}
            </div>
        ),
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('body', {
        header: 'Body',
        cell: info => (
            <div className="max-w-md truncate" title={info.getValue()}>
                {info.getValue()}
            </div>
        ),
        footer: info => info.column.id,
        enableSorting: true,
    }),
];

function TanstackPostTable() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const { data } = useSuspenseQuery<TPost[], Error>({
        queryKey: ['TablePosts'],
        queryFn: fetchPosts,
    });

    const memoizedColumns = React.useMemo(() => columns, []); const table = useReactTable({
        data,
        columns: memoizedColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        enableSorting: true,
        enableColumnFilters: true,
        enableGlobalFilter: true,
        state: {
            pagination,
            sorting,
            columnFilters,
            globalFilter,
        },
        debugTable: true,
    }); return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Posts Table</h2>

            {/* Global Filter */}
            <div className="mb-4">
                <input
                    value={globalFilter ?? ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search all columns..."
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-50">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="border border-gray-300 px-4 py-3 text-left"
                                    >                                        <div
                                        className={header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-gray-100 p-1 rounded' : ''}
                                        onClick={e => {
                                            console.log('Sort clicked for column:', header.column.id);
                                            header.column.getToggleSortingHandler()?.(e);
                                        }}
                                    >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-gray-700">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </span>
                                                <span className="ml-2">
                                                    {{
                                                        asc: '🔼',
                                                        desc: '🔽',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="border border-gray-300 px-4 py-3"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </strong>
                    </span>                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            min="1"
                            max={table.getPageCount()}
                            value={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border border-gray-300 p-1 rounded w-16 text-center"
                        />
                    </span>                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            console.log('Page size changed to:', e.target.value);
                            table.setPageSize(Number(e.target.value))
                        }}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        {[5, 10, 20, 30, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Info */}
            <div className="mt-4 text-sm text-gray-500">
                Showing {table.getRowModel().rows.length} of{' '}
                {table.getRowCount()} Posts
            </div>            {/* Debug Info */}
            <div className="mt-4 p-4 bg-gray-100 rounded text-xs">
                <strong>Debug Info:</strong>
                <pre>{JSON.stringify({
                    pageIndex: table.getState().pagination.pageIndex,
                    pageSize: table.getState().pagination.pageSize,
                    pageCount: table.getPageCount(),
                    canNextPage: table.getCanNextPage(),
                    canPreviousPage: table.getCanPreviousPage(),
                    totalRows: table.getRowCount(),
                    currentRows: table.getRowModel().rows.length,
                    sorting: table.getState().sorting,
                }, null, 2)}</pre>
            </div>
        </div>
    );
}

export default TanstackPostTable