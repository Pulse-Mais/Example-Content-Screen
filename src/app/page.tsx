"use client";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useClass } from "@/hooks/useClass";


export default function Home() {
  const router = useRouter();
  const { trailId } = useClass()

  useEffect(() => {
    router.push(`/${trailId}`);
  }, []);

  return (
    <section className="flex flex-col h-full justify-center mx-12">
      <Loading className="mx-auto" />
    </section>
  );
}
