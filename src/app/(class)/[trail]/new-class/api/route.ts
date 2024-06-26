import { api } from '@/utils/api';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export const config = {
    api: {
        bodyParser: false,
    }
}

export async function PUT(req: NextRequest, res: NextApiResponse) {
    const path              = req.nextUrl.searchParams.get('tid')  as string;
    const trailId           = req.nextUrl.searchParams.get('tid')  as string;
    const classId           = req.nextUrl.searchParams.get('tcid') as string;
    const data              = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if(!file || !trailId || !classId) return;
    const fileType = file.type;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const funcaoValidaFormato = (val: string) => {
        switch(val) {
            case "image":
                return "image";
            case "video":
                return "video";
            case "audio":
                return "audio";
            default:
                return "archive";
        }
    }

    const extensaoDoArquivo = {
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
        "application/pdf": "pdf",
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/svg+xml": "svg",
        "application/msword": "doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "application/vnd.ms-excel": "xls",
        "text/plain": "txt",
    }

    console.log(file.name.split("."))

    var createTrailContent = await api.post(`/create-trail-class-content/archive/${trailId}/${classId}`, {
        archiveExtension: fileType.split("/")[1].startsWith("vnd") ? file.name.split(".")[file.name.split(".").length - 1] : fileType.split("/")[1],
        type: funcaoValidaFormato(fileType.split("/")[0]),
    });
    
    // if (createTrailContent.status !== 200) return NextResponse.json({ message: createTrailContent.data }, { status : 400 });

    var uploadFile = await axios.put(createTrailContent.data.url, buffer)
        .then((res) => {
            if(res.status == 200) {
                // revalidatePath('/(class)/[trail]/new-class', 'page')
                return Response.json({ message: 'Arquivo recebido com sucesso' }, { status: 200 });
            } else {
                throw new Error(res.data)
            }
        })
            .catch((err) => {
                return Response.json({ message: err }, { status : 400 });
            });


    return uploadFile;

    // console.log("PATH", path)
    // return Response.json({ message: 'Arquivo recebido com sucesso' });
};