import { Trash, Upload } from "@/utils/Icons";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { Button } from "./Button";


interface IDragDropProps {
    onFileSelect: (file: File | undefined) => void;
}


export function DragDrop({ onFileSelect }: IDragDropProps) {
    const [file, setFile] = useState<File>();
    const [isDragging, setIsDragging] = useState(false);

    function handleBrowseFile(e: ChangeEvent<HTMLInputElement>) {
        var getFile = e.target.files;
        const allowedMimeTypes = [
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
            'application/pdf', // pdf
            'image/jpeg', // jpg, jpeg
            'image/png', // png
            'image/svg+xml', // svg
            'application/msword', // doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
            'application/vnd.ms-excel', // xls
            'text/plain', // txt
            'audio/*', // audio files
            'video/*' // video files
        ];

        // Verifique se o tipo do arquivo está na lista de tipos permitidos
        if(getFile && getFile.length > 0) {
            if (allowedMimeTypes.includes(getFile[0].type)) {
                setFile(getFile[0]);
                console.log(getFile[0]);
            } else {
                alert('Formato de arquivo não suportado. Por favor, carregue um arquivo válido.');
            }
        }
        
    }

    function handleDrop(event: DragEvent) {
        event.preventDefault();
        setIsDragging(false);
        var getFile = event.dataTransfer.files;
        if(getFile.length > 0) {
            console.log(getFile)
            setFile(getFile[0]);
            console.log(getFile[0]);
        }
    }

    useEffect(() => {
        onFileSelect(file);
    }, [file]);

    return (
        <div 
            className={`border-dotted border-2 rounded-md border-zinc-400 h-full p-4 my-4 select-none ${isDragging ? 'border-midnight-blue-950 bg-sky-100' : ''}`} 
            onDrop={handleDrop} 
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }} 
            onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
            }} 
        >
            { file ? (
                <>
                    {file.type.includes('image') ? (
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-20 h-20 mx-auto rounded-md object-cover" />
                    ) : (
                        <Upload size={78} className="mx-auto text-gray-600" />
                    )}
                    <p>
                        Você está enviando o arquivo: {file.name}
                    </p>
                    <Trash size={24} className="text-red-500 cursor-pointer mx-auto mt-4" onClick={() => setFile(undefined)} />
                </>
            ) : (
                <>
                    <Upload size={78} className="mx-auto text-gray-600" />
                    <p className="text-sm text-center text-gray-600 mt-4 font-medium">
                        Arraste o arquivo e solte para fazer upload
                        <br />
                        ou
                        <br/>
                        <input 
                            hidden
                            type="file"
                            id="browse"
                            accept="image/*, video/*, application/pdf, .doc, .docx, .ppt, .pptx"
                            onChange={handleBrowseFile}
                        />
                        <label htmlFor="browse" className="text-sky-800 cursor-pointer">Procure no dispositivo</label>
                    </p>
                </>
            )}
        </div>
    )
}