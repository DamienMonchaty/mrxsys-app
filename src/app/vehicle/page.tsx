'use client'

import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';
import Table from '@/components/table.component';
import Pagination from '@/components/pagination.component';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Vehicle = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const route = useRouter();

    const { data: vehicles, error } = useSWR<any>(`/api/vehicle/all?page=${page}&pageSize=${pageSize}`, fetcher);

    const handlePageChange = (newPage: any) => {
        setPage(newPage);
    };

    const handleDelete = (id: string) => {
        fetch(`/api/vehicle/delete/` + id, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                mutate(`/api/vehicle/all?page=${page}&pageSize=${pageSize}`);
            })
    }

    const handleAdd= () => {
        route.push('/vehicle/insert');
    }

    const handleEdit = (id: string) => {
        route.push('/vehicle/edit/' + id);
    }

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
            <Table title="Vehicle Table" data={vehicles.content} onDelete={handleDelete} onAdd={handleAdd} onEdit={handleEdit}/>
            <Pagination
                currentPage={page}
                totalPages={Math.ceil(vehicles.totalCount / pageSize)}
                onPageChange={handlePageChange}
            />
        </>
    );

}

export default Vehicle;

