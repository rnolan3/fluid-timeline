import setStyles from './utils/setStyles'

/**
 * Creates a fluid timeline event that holds and sets the state.
 *
 * There are three ways to change the state of an event key. Two are
 * pre-defined styles profiles (`fixEventKey` and `unfixEventKey`). The third,
 * setKeyState({ styleObject }), allows for custom styles to be set.
 *
 *
 * @param  {HTMLElement} element   Event node.
 * @param  {Object} config  Custom configuration.
 *
 * @returns {Object} A Fluid Timeline Event that lets you set and get the
 * current state of the event.
 */
export default function fluidEvent (element, config = {}) {
  if (element.nodeType !== 1) {
    throw new Error('Expected `element` to be an HTML element.')
  }

  const selectors = { keyClassName: config.keyClassName || 'fluid-event-key' }
  const keyElem = element.getElementsByClassName(selectors.keyClassName)[0]
  const origKeyOffset = keyElem.offsetLeft

  // Timeline event key's relative fix position. Set using the
  // `setIndex` method.
  let fixedPosition = 0

  /**
   * Determines if event key is currently fixed.
   *
   * @return {Boolean} Should the event key be fixed.
   */
  function isFixable () {
    return (
      keyElem.style.position !== 'fixed' ||
      keyElem.style.transform
    )
  }

  /**
   * Determines if the event key flows inline with the page.
   *
   * @return {Boolean} Statically (not fixed) style position.
   */
  function isStatic () {
    return /^absolute|static|relative$/.test(keyElem.style.position) ||
      !keyElem.style.position
  }

  /**
   * Get the fix position of the event key.
   *
   * @returns {Number} The current fix state offset position.
   */
  function getFixedPos () {
    return fixedPosition
  }

  /**
   * Get current event coordinates.
   *
   * @return {Object} Event DOM node's top, left, right, bottom, height
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
   * Sets style attributes to the event key.
   *
   * @param {Object} styleProfile A plain object representing the desired
   * style attributes of an event key.
   *
   * @returns {void}
   */
  function setKeyState (styleProfile) {
    setStyles(keyElem, styleProfile)
  }

  /**
   * One of two pre-defined style states for the event key.
   * Use when the key should be fixed and not inline with the page.
   *
   * @param {Boolean} force? This is an optional param that forces a key
   * state set.
   *
   * @returns {void}
   */
  function fixEventKey (force = false) {
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
   * The second pre-defined style state for the event key.
   * Use when the key should be statically positioned on the page.
   *
   * @param {Boolean} force? This is an optional param that forces a key
   * state set.
   *
   * @returns {void}
   */
  function unfixEventKey (force = false) {
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
   * Based on the index of the event within the timeline, the relative top
   * position is set for the event key.
   *
   * @param {Number} eventIndex The index of the event within the timeline.
   *
   * @returns {void}
   */
  function setIndex (eventIndex) {
    fixedPosition = eventIndex * keyElem.clientHeight
  }

  return {
    fixEventKey,
    getCoords,
    getKeyCoords,
    getFixedPos,
    isFixable,
    isStatic,
    setIndex,
    setKeyState,
    unfixEventKey
  }
}
