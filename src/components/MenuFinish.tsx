export default function MenuFinish() {
  return (
    
      <div className="grid place-items-center h-80 w-80 m-auto text-white  z-10 ">
      <h1 className="text-4xl font-bold">Game Over</h1>
      <button 
      style={{ backgroundColor: '#302b2b', border: '7px inset #2c2a2a' }}
        onClick={() => window.location.reload()}
        className="px-8 py-2 border  hover:bg-white/20"
      >
        Restart
      </button>
    </div>
  );
}
