import z from "zod";

const forbiddenWords = ["caralho", "porra", "sexo", "piroca", "puta", "pinto", "buceta", "pênis", "cu"];
const forbiddenWordsRegex = new RegExp(forbiddenWords.join("|"), "i");

export const createClassSchema = z.object({
    title: z.string({
        required_error: "O título é obrigatório",
    })
        .min(5, { message: "O título deve ter no mínimo 5 caracteres" })
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ -]+$/, { message:  "O título não pode conter caracteres especiais ou números" } )
        .refine((val) => !forbiddenWordsRegex.test(val), { message: "Contém palavras não permitidas." }),
    subtitle: z.string({
        required_error: "O subtítulo é obrigatório",
    })
        .min(5, { message: "O título deve ter no mínimo 5 caracteres" })
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ -]+$/, { message:  "O subtitulo não pode conter caracteres especiais ou números" } )
        .refine((val) => !forbiddenWordsRegex.test(val), { message: "Contém palavras não permitidas." }),
    description: z.string({
        required_error: "O descrição é obrigatório",
    })
        .min(5, { message: "A descrição deve conter pelo menos 5 caracteres."})
        .refine((val) => !forbiddenWords.some(forbidden => val.toLowerCase().split(' ').includes(forbidden)), { message: "Contém palavras não permitidas." }),
    contentTime: z.string({
        required_error: "O tempo total da aula é obrigatório",
    }).min(1, { message: "Deve haver um tempo total dá aula." }),
});