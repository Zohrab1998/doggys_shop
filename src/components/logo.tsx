import Image from "next/image";

export default function Logo({ size = 56 }: { size?: number }) {
  return <Image src="/logo.png" alt="Doggy's Shop logo" width={size} height={size} priority />;
}
