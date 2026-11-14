import type { AnimalType } from "@prisma/client";
import AnimalArt from "@/components/animal-art";
import { animalTheme } from "@/lib/catalog";

/**
 * Product photo, or — when the product has no photo yet — the animal mascot on that animal's
 * pale color. A plain <img> is used on purpose: photos can be admin uploads served from our
 * own API or any external URL the owner pastes, which next/image would refuse without
 * whitelisting every host.
 */
export default function ProductImage({
  imageUrl,
  name,
  animalType,
  className = "",
}: {
  imageUrl: string;
  name: string;
  animalType: AnimalType;
  className?: string;
}) {
  if (imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imageUrl} alt={name} loading="lazy" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex h-full w-full items-end justify-center ${className}`}
      style={{ background: animalTheme(animalType).soft }}
    >
      <AnimalArt animal={animalType} className="h-3/4 w-3/4 opacity-90" />
    </div>
  );
}
