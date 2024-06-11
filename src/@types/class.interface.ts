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
    status: string;
    release: {
        schedule: string;
        status: string;
    };
    content: {
        type: string;
        format: string;
        key: string;
        status: string;
        upload: {
            id: string;
            status: string;
        };
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