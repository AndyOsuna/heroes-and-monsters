import Link from "next/link";
import AnimatedDivs from "@/components/animateDivs";
export default function Home() {
  return (
    <main className="bg-[url(../public/bg-home.png)] bg-contain bg-center bg-no-repeat h-screen flex items-center justify-center flex-col overflow-hidden">
   
     <ul className="text-4xl font-bold space-y-2">
        
          <Link
            href="/play"
            className=""
          >
            <button className="bg-[url(../public/play.png)] w-10 h-10 bg-cover hover:scale-110 transition-transform duration-150">
            </button>
          </Link>
        
        <li>
          <button className="bg-[url(../public/creditos.png)] w-10 h-10 bg-cover hover:scale-110 transition-transform duration-150">
           
          </button>
        </li>
      </ul>
    </main>
  );
}
