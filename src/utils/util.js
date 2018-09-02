export const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = a[i]
    a[i] = a[j]
    a[j] = temp
  }
  return a
}

export const classNames = (baseClass, obj) => R.pipe(
  R.toPairs,
  R.reduce((acc, [className, active]) => acc += active ? ` ${className}` : '', baseClass)
)(obj)

export const double = x => [x, x]

export const chunk = count => array => {
  const nested = []
  for (let i = 0; i < array.length; i += count) {
    nested.push(array.slice(i, i + count))
  }
  return nested
}

export const matrix = (h, w = h, v = 0) => {
  const outer = []
  for (let i = 0; i < parseInt(h); i++) {
    outer.push(new Array(parseInt(w)).fill(v))
  }
  return outer
}

export const Grid = (items, columnFn) => {
  return (
    <table className="grid">
      <tbody>
      {U.mapIndexed((column, rowIndex) => 
        <tr key={rowIndex} className="grid__row">
          {column.map((column, colIndex) => columnFn(column, rowIndex, colIndex))}
        </tr>,
        items
      )}
      </tbody>
    </table>
  )
}

export const log = msg => R.tap(val => console.log(msg, val))