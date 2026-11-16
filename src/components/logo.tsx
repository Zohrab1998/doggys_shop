import Image from "next/image";

export default function Logo({ size = 56, className }: { size?: number; className?: string }) {
  return <Image src="/logo.png" alt="Doggy's Shop logo" width={size} height={size} priority className={className} />;
}
