/**
 * Listens to DOM events, then pushes update to subscriptions.
 *
 * @param  {HTMLElement} target   Listens to target's events.
 * Default value: window.
 * @param {Array, String} events  Standard event listeners (e.g. scroll, resize)
 *
 * @returns {Object} Allows you to subscribe and unsubscribe to target events.
 */
export default function eventListener (target = window, events = []) {
  let subscriptions = []

  if (target instanceof Array) {
    events = target
    target = window
  }

  if (typeof target === 'string') {
    events.push(target)
    target = window
  }

  if (typeof events === 'string') {
    events = [ events ]
  }

  if (events.length === 0) {
    throw new Error('No events where defined.')
  }

  /**
   * Bind event listeners
   *
   * @returns {void}
   */
  function _bindDOMEvents () {
    events.forEach((e) => target.addEventListener(e, _handleScroll))
  }

  /**
   * Unbinds event listeners
   *
   * @returns {void}
   */
  function _unbindDOMEvents () {
    events.forEach((e) => target.removeEventListener(e, _handleScroll))
  }

  /**
   * Handles scroll event and fires subscription callbacks. A plain object that
   * contains the target's scroll top and left position.
   *
   * @returns {void}
   */
  function _handleScroll () {
    subscriptions.forEach((callback) => {
      let scrollTop = target.scrollTop || target.scrollY
      let scrollBottom = window.innerHeight + scrollTop

      callback({
        top: scrollTop,
        left: target.scrollLeft || target.scrollX,
        bottom: scrollBottom
      })
    })
  }

  /**
   * Subscribe to target's events.
   *
   * @param  {Function} callback Callback function that will be called
   * when event fires.
   * @returns {Number} Subscription index.
   */
  function subscribe (callback) {
    subscriptions.push(callback)

    if (subscriptions.length === 1) {
      _bindDOMEvents()
    }

    return subscriptions.length - 1
  }

  /**
   * Unsubscribe from target's events.
   *
   * @param  {Number?} Index of subscription.
   * @returns {void}
   */
  function unsubscribe (index) {
    if (!index) {
      throw new Error('Which subscriptions should be unsubscribed?')
    }

    subscriptions.splice(index, 1)

    if (subscriptions.length === 0) {
      _unbindDOMEvents()
    }
  }

  return {
    subscribe,
    unsubscribe
  }
}
