import LoggerType from "@/game/logger";
import { cn } from "@/lib/utils";

export default function Logger({
  logger,
  fullSize,
}: {
  logger: LoggerType;
  fullSize: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-2 left-1/2 -translate-x-[50%] text-sm 2xl:text-lg px-2 bg-black text-white min-h-12 max-h-28 min-w-12 overflow-auto opacity-20 hover:opacity-90 transition-opacity",
        fullSize
          ? "max-h-[calc(100vh-100px)] left-2 opacity-100 translate-x-0 top-[50px] no-scrollbar"
          : ""
      )}
    >
      {logger.logs.map((log, i) => (
        <p key={i}>{log}</p>
      ))}
    </div>
  );
}
