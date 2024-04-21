"use client"

import React, { useRef, useState } from 'react';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            console.error('Aucun fichier sélectionné');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadSuccess(true);
            } else {
                console.error('Erreur lors du téléversement du fichier');
            }
        } catch (error) {
            console.error('Erreur lors de la requête de téléversement de fichier :', error);
        }
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">Télécharger un fichier sur Backblaze B2</h1>
            <input type="file" onChange={handleFileChange} className="mb-4"/>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Télécharger</button>
            {uploadSuccess && (
                <p className="text-green-500">Fichier téléchargé avec succès !</p>
            )}
        </div>
    );
}

export default Upload;
