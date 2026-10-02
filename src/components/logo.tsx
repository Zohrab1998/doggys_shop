/**
 * Hand-built approximation of the supplied "Doggy's Shop" logo PDF (navy/orange ring, light-blue
 * poodle silhouette, arched wordmark). Not an exact vector extraction — swap for the real
 * exported PNG/SVG asset when available.
 */
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-label="Doggy's Shop logo">
      <circle cx="100" cy="100" r="98" fill="#0b4f73" />
      <circle cx="100" cy="100" r="86" fill="#f2902e" />
      <circle cx="100" cy="100" r="83" fill="none" stroke="#0b4f73" strokeWidth="2" />

      <path id="logo-arc" d="M 38 90 A 62 62 0 0 1 162 90" fill="none" />
      <text fontSize="19" fontWeight="700" fill="#8fd3f4" stroke="#0b4f73" strokeWidth="1.5">
        <textPath href="#logo-arc" startOffset="50%" textAnchor="middle">
          Doggy&apos;s shop
        </textPath>
      </text>

      <g fill="#8fd3f4" stroke="#0b4f73" strokeWidth="2.5">
        <circle cx="100" cy="128" r="30" />
        <circle cx="72" cy="108" r="17" />
        <circle cx="128" cy="108" r="17" />
        <circle cx="78" cy="150" r="14" />
        <circle cx="122" cy="150" r="14" />
      </g>
      <g fill="#0b4f73">
        <circle cx="90" cy="122" r="3" />
        <circle cx="110" cy="122" r="3" />
      </g>
      <path
        d="M 100 128 L 93 136 Q 100 142 107 136 Z"
        fill="#0b4f73"
      />
    </svg>
  );
}
