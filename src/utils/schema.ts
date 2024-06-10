import z from "zod";

export const createClassSchema = z.object({
    title: z.string({
        required_error: "O título é obrigatório",
    }).min(1),
    subtitle: z.string({
        required_error: "O subtítulo é obrigatório",
    }).min(1),
    description: z.string({
        required_error: "O descrição é obrigatório",
    }).min(1),
});