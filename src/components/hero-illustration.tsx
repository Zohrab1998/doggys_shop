import Image from "next/image";

/**
 * Composite built from crops of the actual reference image (public/pets/*.png), positioned at
 * their original relative coordinates so the scene reconstructs the source composition exactly,
 * rather than a hand-drawn approximation.
 */
const LAYERS: { src: string; alt: string; left: number; top: number; width: number; height: number }[] = [
  { src: "/pets/doghouse.png", alt: "Red-roofed dog house", left: 33.97, top: 22.41, width: 54.35, height: 49.02 },
  { src: "/pets/perch-birdhouse.png", alt: "Perch with birdhouse and bird", left: 65.9, top: 0, width: 29.21, height: 44.82 },
  { src: "/pets/parrot-swing.png", alt: "Parrot on a hanging swing", left: 26.49, top: 3.5, width: 38.04, height: 35.71 },
  { src: "/pets/chameleon.png", alt: "Chameleon on a branch", left: 76.09, top: 25.21, width: 23.91, height: 33.61 },
  { src: "/pets/dog.png", alt: "Dog", left: 5.43, top: 32.21, width: 44.84, height: 60.22 },
  { src: "/pets/cat.png", alt: "Cat", left: 55.03, top: 39.22, width: 29.89, height: 44.12 },
  { src: "/pets/rabbit.png", alt: "White rabbit", left: 38.04, top: 49.72, width: 25.14, height: 50.28 },
  { src: "/pets/turtle-bowl.png", alt: "Turtle next to a food bowl", left: 0, top: 72.13, width: 41.44, height: 23.81 },
  { src: "/pets/fishbowl.png", alt: "Goldfish bowl", left: 55.71, top: 74.23, width: 29.21, height: 21.01 },
  { src: "/pets/hamster-wheel.png", alt: "Hamster in a wheel", left: 78.8, top: 68.63, width: 21.2, height: 28.01 },
];

export default function HeroIllustration() {
  return (
    <div className="relative h-full w-full">
      {LAYERS.map((layer) => (
        <div
          key={layer.src}
          className="absolute"
          style={{
            left: `${layer.left}%`,
            top: `${layer.top}%`,
            width: `${layer.width}%`,
            height: `${layer.height}%`,
          }}
        >
          <Image src={layer.src} alt={layer.alt} fill className="object-contain" sizes="40vw" />
        </div>
      ))}
    </div>
  );
}
