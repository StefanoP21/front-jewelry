import { Gem, Ampersand, Watch } from "lucide-react"; // Importa los iconos que necesitas

const Logo = ({ expanded }: { expanded: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 overflow-hidden ${
        expanded ? "w-32 opacity-100 scale-100" : "w-0 opacity-0 scale-0"
      }`}
      style={{ height: 64 }} // Mantener el alto fijo
    >
      <Gem color="#22d3ee" className="h-8 w-8" />
      <Ampersand className="h-8 w-8 text-[hsl(var(--foreground))]" />
      <Watch color="#eab308" className="h-8 w-8" />
      <span className="font-bold text-[hsl(var(--foreground))] text-xl">Jenny</span>
    </div>
  );
};

export default Logo;
