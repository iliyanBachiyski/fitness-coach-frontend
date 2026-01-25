import LogoImage from '@/assets/logo.png'

export interface LogoProps {
  animated?: boolean
  text?: string
  width?: HTMLImageElement['width']
}

export function Logo({ animated, text, width = 80 }: LogoProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {animated ? (
        <div className="animate-pulse-slow">
          <img src={LogoImage} width={width} className="rotate-135" />
        </div>
      ) : (
        <img src={LogoImage} width={width} className="rotate-135" />
      )}
      {!!text && <h1 className="text-h1 font-bold">{text}</h1>}
    </div>
  )
}
