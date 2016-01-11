import StickyItem from './stickyItem'
import eventListener from './utils/eventListener'

// Bind event listeners to body when sticky-list is initialized.
const scrollSource = eventListener([ 'scroll', 'touchmove' ])
const resizeSource = eventListener([ 'resize', 'orientationchange' ])

/**
 * A `stickyList()`` is a high-level API for automatically setting up a
 * StickyList. This method automatically updates the state of it's items.
 *
 * @param  {HTMLElement} wrapper  DOM node that wraps the list.
 *
 * @return {Object} An instance of StickyList that allows you to bind
 * list items and unmount the current instance.
 */
export default function stickyList (wrapper = document.body) {
  const currentWrapper = wrapper

  // Bound list items.
  let stickyListItems = []
  let stickyListItemsLength = 0
  let lastListItem = null

  let listenerInstance
  let resizeInstance

  /**
   * Resolve the next state of an item in the StickyList.
   *
   * @param  {StickyItem} itemSource  Instance of a `StickyItem`.
   * @param  {Object} scrollPos   Contains the current top and left scroll
   * position.
   *
   * @returns {void}
   */
  function _resolveItemState (itemSource, metrics) {
    if (metrics.lastKeyPos > metrics.currentWrapper.bottom) {
      const keyShim = -(metrics.lastKeyPos - metrics.currentWrapper.bottom)
      itemSource.setKeyState({
        transform: `translateY(${ keyShim }px)`
      })
    } else if (itemSource.getCoords().top <= itemSource.getFixedPos()) {
      itemSource.fixKey()
    } else {
      itemSource.unfixKey()
    }
  }

  /**
   * Bind item node to a StickyList.
   *
   * @param  {HTMLElement} element A DOM node that is within a stickyList.
   * @return {void}
   */
  function bindItem (element) {
    stickyListItems.push(StickyItem(element))
    stickyListItemsLength++
    lastListItem = stickyListItems[stickyListItemsLength - 1]
  }

  /**
   * Unsubscribe from events.
   *
   * This is important when the StickyList is dynamically unmounted.
   *
   * @return {void}
   */
  function destroy () {
    scrollSource.unsubscribe(listenerInstance)
    resizeSource.unsubscribe(resizeInstance)
  }

  // Listen to scroll changes and update the state of every item.
  listenerInstance = scrollSource.subscribe((scrollPos) => {
    const lastKeyMetrics = lastListItem.getKeyCoords()
    const lastKeyPos = lastListItem.getFixedPos()
    const lastItemMetrics = lastListItem.getCoords()
    const currentWrapperMetrics = currentWrapper.getBoundingClientRect()

    stickyListItems.forEach((itemSource, i) => {
      itemSource.setIndex(i)
      _resolveItemState(itemSource, {
        currentWrapper: currentWrapperMetrics,
        lastItem: lastItemMetrics,
        lastKey: lastKeyMetrics,
        lastKeyPos: lastKeyPos,
        scrollPos: scrollPos
      })
    })
  })

  // Listen to resize events and re-positions fixed keys to keep them in the
  // correct location.
  resizeInstance = resizeSource.subscribe(() => {
    stickyListItems.forEach((itemSource) => {
      if (!itemSource.isStatic()) {
        const left = itemSource.getCoords().left +
          itemSource.getKeyCoords().staticOffsetLeft
        itemSource.setKeyState({
          left: `${ left }px`
        })
      }
    })
  })

  return {
    bindItem,
    destroy
  }
}
