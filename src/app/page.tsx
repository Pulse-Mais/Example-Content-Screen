// import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, StarHalf } from "../utils/Icons"
 

export const metadata: Metadata = {
  title: "Inicio | Pulse Mais"
};

export default function Home() {
  return (
    <section className="flex flex-col h-full justify-center mx-12">
      <div className="">
        <h1 className="font-medium text-2xl">Título da trilha</h1>
        <p className="max-w-96 text-justify mt-2 mb-9">Descrição texto aleatório curto (Você poderá se conectar com outros profissionais da costura e trocar ideias sobre suas experiências no ramo.)</p>
      </div>

      <div className="flex w-full justify-center gap-11">
        <div className="flex flex-col items-center max-w-96 py-11 px-6 bg-white border-zinc-200 border-[1px] rounded-2xl shadow-md">
          <Star size={46} color="#004DBC" />
          <h1 className="font-medium text-xl mt-2">Aulas publicadas</h1>
          <p className="text-center mt-6">Aqui você acessa todass as aulas já públicadas nessa trilha</p>

          <Link href="./published-classes" className="mt-20 bg-[#004DBC] text-white rounded-xl w-full text-center py-4">Acessar</Link>
        </div>
        <div className="flex flex-col items-center max-w-96 py-11 px-6 bg-white border-zinc-200 border-[1px] rounded-2xl shadow-md">
          <StarHalf size={46} color="#004DBC" />
          <h1 className="font-medium text-xl mt-2">Nova aula</h1>
          <p className="text-center mt-6">Aqui você pode registrar ou publicar uma nova aula</p>

          <Link href="./new-class" className="mt-20 bg-[#004DBC] text-white rounded-xl w-full text-center py-4">Acessar</Link>
        </div>
      </div>
    </section>
  );
}
