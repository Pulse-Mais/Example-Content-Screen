interface ICreateClass {
    title: string,
    description: string,
    subtitle: string
}

interface IClass {
    id: string,
    title: string,
    description: string,
    subtitle: string,
    storageKey: string;
    status: "published" | "not-published",
    createAt: string,
    updateAt: string
}

interface ISetTrailClassContentInput {
    readonly key: string,
    readonly type: "empty" | "video" | "archive" 
    readonly format: "planilha" | "pdf" | "slides" | "video"| "empty"
    readonly status: "empty" | "filled"
}

export type {
    ICreateClass,
    IClass,
    ISetTrailClassContentInput
}