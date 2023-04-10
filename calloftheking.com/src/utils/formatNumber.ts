function formatNumber(x: number) {
  return addComas(Math.floor(x) === x ? x.toString() : x.toFixed(2))
}

function addComas(x: string) {
  return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default formatNumber
