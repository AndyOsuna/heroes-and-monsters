export default function MenuFinish() {
  return (
    <div className="grid place-items-center h-80 w-80 m-auto bg-black opacity-90 rounded-lg drop-shadow-2xl">
      <h1 className="text-4xl font-bold">Game Over</h1>
      <button
        onClick={() => window.location.reload()}
        className="px-8 py-2 border rounded-md hover:bg-white/20"
      >
        Restart
      </button>
    </div>
  );
}
