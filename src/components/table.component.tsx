import React from 'react';

interface TableProps {
    title: string;
    data: Record<string, any>[];
    onDelete?: (id: string) => void;
    onAdd?: () => void;
    onEdit?: (id: string) => void;
}

const Table: React.FC<TableProps> = ({ title, data, onDelete, onAdd, onEdit }) => {
    const handleDeleteClick = (id: string) => {
        if (onDelete) {
            onDelete(id);
        }
    };

    const handleAdd = () => {
        if (onAdd) {
            onAdd();
        }
    };

    const handleEditClick = (id: string) => {
        if (onEdit) {
            onEdit(id);
        }
    };

    return (
        <div className='container mx-auto relative overflow-x-auto shadow-md sm:rounded-lg p-4'>
            <div className="flex justify-between items-center mb-4">
                <h2 className='text-3xl font-bold'>{title}</h2>
                {onAdd && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAdd()}>+</button>
                )}
            </div>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} className='px-6 py-3'>{key}</th>
                        ))}
                        {(onDelete || onEdit) && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='bg-white dark:bg-gray-800'>
                            {Object.values(item).map((value, index) => (
                                <td key={index} className='px-6 py-4'>{value}</td>
                            ))}
                            {(onDelete || onEdit) && (
                                <td>
                                    <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                    <button onClick={() => handleEditClick(item.id)}>Edit</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;