import type { AnimalType } from "@prisma/client";
import Image from "next/image";

/**
 * Real photos of the shop's four pets, cut out of their studio background
 * (public/pets/cutouts) — used wherever the site shows "the dog", "the cat" and so on.
 */
const PHOTOS: Record<AnimalType, { src: string; width: number; height: number }> = {
  DOG: { src: "/pets/cutouts/dog.webp", width: 365, height: 640 },
  CAT: { src: "/pets/cutouts/cat.webp", width: 294, height: 640 },
  BIRD: { src: "/pets/cutouts/bird.webp", width: 337, height: 640 },
  HAMSTER: { src: "/pets/cutouts/hamster.webp", width: 417, height: 545 },
};

/** Round head-and-shoulders photo of each animal (public/pets/avatars). */
export function animalAvatarSrc(animal: AnimalType): string {
  return `/pets/avatars/${animal.toLowerCase()}.jpg`;
}

export default function AnimalPhoto({
  animal,
  alt = "",
  className,
  sizes,
}: {
  animal: AnimalType;
  alt?: string;
  className?: string;
  sizes?: string;
}) {
  const photo = PHOTOS[animal];
  return (
    <Image
      src={photo.src}
      alt={alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes ?? "240px"}
      className={className}
    />
  );
}
