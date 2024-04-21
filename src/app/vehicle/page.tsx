'use client'

import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import useSWR from 'swr';
import Table from '@/components/table.component';
import Pagination from '@/components/pagination.component';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Vehicle = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data: vehicles, error } = useSWR<any>(`/api/vehicle/all?page=${page}&pageSize=${pageSize}`, fetcher);

    const handlePageChange = (newPage: any) => {
        setPage(newPage);
    };

    if (error) return (
        <div className="flex justify-center items-center h-screen">
            <div className='text-2xl text-blue-500 text-center font-bold'>Error: {error.message}</div>
        </div>
    );
    if (!vehicles) return (
        <div className="flex justify-center items-center h-screen">
            <div className='text-2xl text-blue-500 text-center font-bold'>Loading...</div>
        </div>
    );

    return (
        <>
            <Table title="Vehicle Table" data={vehicles.content} />
            <Pagination
                currentPage={page}
                totalPages={Math.ceil(vehicles.totalCount / pageSize)}
                onPageChange={handlePageChange}
            />
        </>
    );

}

export default Vehicle;

