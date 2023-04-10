function compose(...args: Function[]) {
  return (x: any) => args.reduceRight((acc, fn) => fn(acc), x)
}

export default compose
