import Image from "next/image";

/**
 * Single crop of the full animal cluster straight from the reference image (public/pets/pets-scene.png),
 * rather than separately-positioned pieces — avoids any seam/alignment drift entirely.
 */
export default function HeroIllustration() {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/pets/pets-scene.png"
        alt="Dog, cat, rabbit, chameleon, parrot, turtle, goldfish, and hamster gathered around a dog house"
        fill
        className="object-contain"
        sizes="40vw"
        priority
      />
    </div>
  );
}
