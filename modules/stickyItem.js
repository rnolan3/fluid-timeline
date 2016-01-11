import setStyles from './utils/setStyles'

/**
 * Creates an instance of a sticky item that holds and sets the state.
 *
 * There are three ways to change the state of an item key. Two are
 * pre-defined styles profiles (`fixKey` and `unfixKey`). The third,
 * setKeyState({ styleObject }), allows for custom styles to be set.
 *
 *
 * @param  {HTMLElement} element   An item in your StickyList.
 * @param  {Object} config  Custom configuration.
 *
 * @returns {Object} A sticky item that lets you set and get the current state.
 */
export default function StickyItem (element, config = {}) {
  if (element.nodeType !== 1) {
    throw new Error('Expected `element` to be an HTML element.')
  }

  const selectors = { keyClassName: config.keyClassName || 'sticky-list-item' }
  const keyElem = element.getElementsByClassName(selectors.keyClassName)[0]
  const origKeyOffset = keyElem.offsetLeft

  // The key's relative fix position. Set using the `setIndex` method.
  let fixedPosition = 0

  /**
   * Determines if the item's key is currently fixed.
   *
   * @return {Boolean} Should the key be fixed.
   */
  function isFixable () {
    return (
      keyElem.style.position !== 'fixed' ||
      keyElem.style.transform
    )
  }

  /**
   * Determines if the item's key flows inline with the page.
   *
   * @return {Boolean} Statically (not fixed) style position.
   */
  function isStatic () {
    return /^absolute|static|relative$/.test(keyElem.style.position) ||
      !keyElem.style.position
  }

  /**
   * Get the fix position of the item key.
   *
   * @returns {Number} The current fix state offset position.
   */
  function getFixedPos () {
    return fixedPosition
  }

  /**
   * Get current item coordinates.
   *
   * @return {Object} Item DOM node's top, left, right, bottom, height
   * and width.
   *
   * See `getBoundingClientRect()` api doc for further details.
   */
  function getCoords () {
    return element.getBoundingClientRect()
  }

  function getKeyCoords () {
    return Object.assign(keyElem.getBoundingClientRect(), {
      staticOffsetLeft: origKeyOffset
    })
  }

  /**
   * Sets style attributes to the key.
   *
   * @param {Object} styleProfile A plain object representing the desired
   * style attributes of the key.
   *
   * @returns {void}
   */
  function setKeyState (styleProfile) {
    setStyles(keyElem, styleProfile)
  }

  /**
   * One of two pre-defined style states for the key.
   * Use when the key should be fixed and not inline with the page.
   *
   * @param {Boolean} force? This is an optional param that forces a key
   * state set.
   *
   * @returns {void}
   */
  function fixKey (force = false) {
    if (isFixable() || force) {
      setKeyState({
        top: `${ getFixedPos() }px`,
        position: `fixed`,
        left: `${ getKeyCoords().left }px`,
        transform: null
      })
    }
  }

  /**
   * The second pre-defined style state for the key.
   * Use when the key should be statically positioned on the page.
   *
   * @param {Boolean} force? This is an optional param that forces a key
   * state set.
   *
   * @returns {void}
   */
  function unfixKey (force = false) {
    if (!isStatic() || force) {
      setKeyState({
        top: null,
        position: null,
        left: null,
        transform: null
      })
    }
  }

  /**
   * Based on the index of the stick item within the list, the relative top
   * position is set for the item key.
   *
   * @param {Number} itemIndex The index of the item within the StickyList.
   *
   * @returns {void}
   */
  function setIndex (itemIndex) {
    fixedPosition = itemIndex * keyElem.clientHeight
  }

  return {
    fixKey,
    getCoords,
    getKeyCoords,
    getFixedPos,
    isFixable,
    isStatic,
    setIndex,
    setKeyState,
    unfixKey
  }
}
