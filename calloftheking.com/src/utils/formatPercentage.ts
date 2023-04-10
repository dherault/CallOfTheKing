import formatNumber from '~utils/formatNumber'

function formatPercentage(percentage: number) {
  return `${percentage > 0 ? '+' : ''}${formatNumber(percentage)}%`
}

export default formatPercentage
