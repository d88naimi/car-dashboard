// components/GeometricSpinner.tsx
export default function GeometricSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        className="animate-spin"
      >
        {/* Hexagon */}
        <polygon
          points="25,5 45,15 45,35 25,45 5,35 5,15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600"
        />
        {/* Inner triangle */}
        <polygon
          points="25,15 35,30 15,30"
          fill="currentColor"
          className="text-blue-400 opacity-60"
        />
      </svg>
    </div>
  );
}
