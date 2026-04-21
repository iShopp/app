import { ShieldCheck, Truck, BadgeCheck } from 'lucide-react';

const ICONS = {
  secure: ShieldCheck,
  shipping: Truck,
  verified: BadgeCheck,
};

interface TrustBadgeProps {
  type: keyof typeof ICONS;
  label: string;
}

export default function TrustBadge({ type, label }: TrustBadgeProps) {
  const Icon = ICONS[type];
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}
