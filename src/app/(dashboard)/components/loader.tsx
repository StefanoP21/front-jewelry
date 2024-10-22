type FullScreenLoaderProps = {
  color?: "primary" | "secondary";
};

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(var(--background) / 0.75)]">
      <svg
        className="animate-spin h-40 w-40"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ color: `hsl(var(--primary))` }}
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>
  );
};