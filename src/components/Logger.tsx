import LoggerType from "@/game/logger";

export default function Logger({ logger }: { logger: LoggerType }) {
  return (
    <div className="absolute top-2 left-1/2 -translate-x-[50%] text-sm px-2 bg-black text-white min-h-12 max-h-28 min-w-12 overflow-auto opacity-20 hover:opacity-90 transition-opacity">
      {logger.logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </div>
  );
}
