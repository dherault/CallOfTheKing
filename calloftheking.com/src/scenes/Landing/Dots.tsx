import { ReactNode, useMemo } from 'react'

function Dots({ reversed }: any) {
  const dots = useMemo(() => {
    const dots: ReactNode[] = []

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (reversed ? i < j : i > j) continue

        dots.push(
          <div
            key={(i + j) * (i + j + 1) / 2 + i}
            className="absolute w-2 h-2 bg-primary-500"
            style={{ top: `${i * 20}%`, left: `calc(${j * 20}% - 8px)` }}
          />
        )
      }
    }

    return (
      <div className="relative w-full h-full">
        {dots}
      </div>
    )
  }, [reversed])

  return dots
}

export default Dots
