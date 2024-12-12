interface AvatarProps {
  name: string;
  color?: boolean;
}

export default function Avatar({ name, color = true }: AvatarProps) {
  const initial = name?.charAt(0).toUpperCase();

  return (
    <div
      className={`w-10 h-10 rounded-full ${color ? "bg-[hsl(var(--primary))]" : "bg-[#a3a3a3]"} flex items-center justify-center text-[hsl(var(--primary-foreground))] font-bold`}
      style={{ aspectRatio: "1" }}
    >
      {initial}
    </div>
  );
}
