export default function Home() {
  return (
    <main className="bg-[url(https://images5.alphacoders.com/131/1311254.png)] bg-cover bg-no-repeat h-screen flex items-center justify-center flex-col">
      <h1 className="text-8xl font-bold mb-20 text-white bg-black">
        Bienvenido al Himalaya
      </h1>
      <ul className="text-4xl font-bold space-y-2">
        <li>
          <button className="bg-white hover:scale-125 transition-transform duration-150">
            Start
          </button>
        </li>
        <li>
          <button className="bg-white hover:scale-125 transition-transform duration-150">
            Créditos
          </button>
        </li>
      </ul>
    </main>
  );
}
