export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="flex items-center justify-center gap-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-2xl text-gray-300">---------</span>{" "}
          <span>Theo Drive</span>
          <span className="text-2xl text-gray-300">---------</span>
        </h1>
      </div>
    </main>
  );
}
