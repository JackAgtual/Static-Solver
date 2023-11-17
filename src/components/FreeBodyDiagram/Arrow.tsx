type ArrowProps = {
  x: number
  y: number
  rotate?: boolean
}

function Arrow({ x, y, rotate = false }: ArrowProps) {
  const size = 10
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100">
      <path
        transform={rotate ? `rotate(90 50 50)` : ''}
        d="M14.0607 1.93934C13.4749 1.35355 12.5251 1.35355 11.9393 1.93934L2.3934 11.4853C1.80761 12.0711 1.80761 13.0208 2.3934 13.6066C2.97918 14.1924 3.92893 14.1924 4.51472 13.6066L13 5.12132L21.4853 13.6066C22.0711 14.1924 23.0208 14.1924 23.6066 13.6066C24.1924 13.0208 24.1924 12.0711 23.6066 11.4853L14.0607 1.93934ZM14.5 98L14.5 3H11.5L11.5 98H14.5Z"
        fill="black"
      />
    </svg>
  )
}

export default Arrow
