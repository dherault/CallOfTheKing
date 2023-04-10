function roundNumber(x: number, exp = 3) {
  return Math.round(x * 10 ** exp) / 10 ** exp
}

export default roundNumber
