export const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
  return a
}

export const classNames = obj => R.pipe(
  R.toPairs,
  R.reduce((acc, [className, active]) => acc += active ? ` ${className}` : '', '')
)(obj)

export const double = x => [x, x]

export const chunk = count => array => {
  const nested = []
  for (let i = 0; i < array.length; i += count) {
    nested.push(array.slice(i, i + count))
  }
  return nested
}