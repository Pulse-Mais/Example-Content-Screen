interface ICreateClass {
    title: string,
    description: string,
    subtitle: string
}

interface IClass {
    id: string;
    idTrail: string;
    title: string;
    subtitle: string;
    description: string;
    courseStorageKey: string;
    status: "published" | "not-published";
    release: {
        schedule: string;
        status: "locked" | "unlocked";
    };
    content: {
        type: "video" | "archive" | "none" | "empty" | "image" | "audio";
        // format: "planilha" | "pdf" | "slides" | "video";
        key: string;
        status: "empty" | "in-upload" | "filled";
        upload: {
            id: string;
            status: string;
        };
        archiveExtension: string;
    };
    createAt: string;
    updateAt: string;
}

interface ISetTrailClassContentInput {
    readonly key: string,
    readonly type: "empty" | "video" | "archive"
    readonly format: "planilha" | "pdf" | "slides" | "video" | "empty"
    readonly status: "empty" | "filled"
}

export type {
    ICreateClass,
    IClass,
    ISetTrailClassContentInput
}