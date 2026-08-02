'use client';

import Image from 'next/image';

// CodeOrigin.ai Logo Component
// Logo file must be placed at: packages/frontend/public/logo.svg

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/logo.svg"
      alt="CodeOrigin.ai"
      width={size}
      height={size}
      className="rounded-lg object-contain"
      priority
    />
  );
}

export function LogoFull({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const h = size === 'small' ? 28 : size === 'large' ? 44 : 36;
  const w = size === 'small' ? 100 : size === 'large' ? 160 : 130;

  return (
    <Image
      src="/logo.svg"
      alt="CodeOrigin.ai"
      width={w}
      height={h}
      className="object-contain"
      priority
    />
  );
}

export default LogoFull;
