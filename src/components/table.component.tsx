import React from 'react';

interface TableProps {
    title: string;
    data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ title, data }) => {
    return (
        <div className='container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg p-4'>
            <h2 className='text-3xl font-bold mb-4'>{title}</h2>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} className='px-6 py-3'>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='bg-white dark:bg-gray-800'>
                            {Object.values(item).map((value, index) => (
                                <td key={index} className='px-6 py-4'>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;