'use client'

import Link from 'next/link';
import React, { useEffect, useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
import useSWR from 'swr';
import Table from '@/components/table.component';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Vehicle = () => {

    const { data: vehicles, error } = useSWR<any>(`/api/vehicle/all`, fetcher);
    console.log(vehicles);

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
        </>
    );

}

export default Vehicle;

