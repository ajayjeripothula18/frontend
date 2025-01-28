'use client';

interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-4 rounded-lg bg-white/10">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/90 mt-1">{description}</p>
    </div>
  );
} 