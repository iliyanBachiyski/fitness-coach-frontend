import { useCallback, useEffect, useState } from 'react'

interface UseCountdownReturn {
  seconds: number
  isComplete: boolean
  reset: () => void
}

export function useCountdown(initialSeconds: number = 60): UseCountdownReturn {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [seconds])

  const reset = useCallback(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  return {
    seconds,
    isComplete: seconds === 0,
    reset,
  }
}
