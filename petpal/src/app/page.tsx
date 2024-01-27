import Image from "next/image";

export default function Home() {
  return (
    <main className="font-bold text-4xl flex min-h-screen flex-col items-center justify-center text-yellow-600">
      PETPAL
      <Image src="/gold.jpg" alt="PP" width="100" height="100"
        className="rounded-xl"/>
    </main>
  );
}
