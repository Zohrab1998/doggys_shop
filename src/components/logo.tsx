import { PawPrint } from "lucide-react";

export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full bg-brand-orange text-white"
      style={{ height: size, width: size }}
    >
      <PawPrint className="h-6 w-6" />
    </span>
  );
}
