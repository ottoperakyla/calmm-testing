const DraggableList = ({ items }) => {
  console.log({items})
  return (
    <div className="draggable__list space-l space-clear-rl">
      {U.map((text) => {
        const node = U.variable()
        const dragging = node.flatMapLatest((node) =>
            Kefir
                .fromEvents(node, 'mousedown')
                .flatMapLatest((md) =>
                    Kefir.fromEvents(window, 'mousemove')
                        .map((mm) => console.log({mm, md})
                        && ({
                            // left: mm.clientX - md.offsetX,
                            top: mm.clientY - md.offsetY - 46
                        }))
                        .takeUntilBy(Kefir.fromEvents(node, 'mouseup'))
                )
        ).toProperty(R.always({}))


        return (
          <div ref={(ref) => ref && node.set(ref)}
            style={dragging} 
            className="draggable__item space-l touchable">
            {text}
          </div>
          )
      }, items)}
    </div>
  )
}

export default DraggableList
