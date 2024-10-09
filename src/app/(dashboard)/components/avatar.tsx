interface AvatarProps {
  name: string;
}

export default function Avatar({ name }: AvatarProps) {
  const initial = name?.charAt(0).toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-[hsl(var(--primary-foreground))] font-bold">
      {initial}
    </div>
  );
}
