import { GlassCard, type GlassCardProps } from '../ui/glass-card'
import { Logo } from './Logo'

interface WithBackgroundLogoProps {
  variant?: GlassCardProps['variant']
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const getSizeDimensions = (size: 'xs' | 'sm' | 'md' | 'lg') => {
  const dimensions = {
    xs: { width: 40, height: 40 },
    sm: { width: 48, height: 48 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 },
  }
  return dimensions[size]
}

export function WithBackgroundLogo({
  variant = 'elevated',
  size = 'md',
}: WithBackgroundLogoProps) {
  const { width, height } = getSizeDimensions(size)

  return (
    <GlassCard
      variant={variant}
      className="flex items-center justify-center"
      style={{
        width,
        height,
      }}
    >
      <Logo width={width - 8} />
    </GlassCard>
  )
}
