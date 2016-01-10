import eventListener from './utils/eventListener'
import fluidEvent from './fluidEvent'

// Bind scroll listener to body when fluid timeline is initialized.
const scrollSource = eventListener([ 'scroll', 'touchmove' ])
const resizeSource = eventListener([ 'resize', 'orientationchange' ])

/**
 * A `fluidTimeline()`` is a high-level API for automatically setting up a
 * fluid timeline. This method automatically updates the state of it's events.
 *
 * @param  {HTMLElement} wrapper  DOM node that wraps the timeline events.
 *
 * @return {Object} A Fluid Timeline that allows you to bind Timeline Events and
 * unmount the current instance of the fluid timeline.
 */
export default function fluidTimeline (wrapper = document.body) {
  const currentWrapper = wrapper

  // Bound timeline events.
  let fluidTimelineEvents = []
  let fluidTimelineEventsLength = 0
  let lastFluidTimelineEvent = null

  let listenerInstance
  let resizeInstance

  /**
   * Resolve the next state of a timeline event.
   *
   * @param  {fluidEvent} eventSource Instance of a `fluidEvent`.
   * @param  {Object} scrollPos   Contains the current top and left scroll
   * position of document.
   *
   * @returns {void}
   */
  function _resolveEventState (eventSource, metrics) {
    if (metrics.lastKeyPos > metrics.currentWrapper.bottom) {
      const keyShim = -(metrics.lastKeyPos - metrics.currentWrapper.bottom)
      eventSource.setKeyState({
        transform: `translateY(${ keyShim }px)`
      })
    } else if (eventSource.getCoords().top <= eventSource.getFixedPos()) {
      eventSource.fixEventKey()
    } else {
      eventSource.unfixEventKey()
    }
  }

  /**
   * Bind event node to timeline.
   *
   * @param  {HTMLElement} element An event DOM node that is within
   * the timeline.
   * @return {void}
   */
  function bindEvent (element) {
    fluidTimelineEvents.push(fluidEvent(element))
    fluidTimelineEventsLength++
    lastFluidTimelineEvent = fluidTimelineEvents[fluidTimelineEventsLength - 1]
  }

  /**
   * Unsubscribe from scroll event.
   *
   * This is important when the Fluid Timeline is dynamically unmounted.
   *
   * @return {void}
   */
  function destroy () {
    scrollSource.unsubscribe(listenerInstance)
    resizeSource.unsubscribe(resizeInstance)
  }

  // Listen to scroll changes and update the state of every timeline event.
  listenerInstance = scrollSource.subscribe((scrollPos) => {
    const lastKeyMetrics = lastFluidTimelineEvent.getKeyCoords()
    const lastKeyPos = lastFluidTimelineEvent.getFixedPos()
    const lastEventMetrics = lastFluidTimelineEvent.getCoords()
    const currentWrapperMetrics = currentWrapper.getBoundingClientRect()

    fluidTimelineEvents.forEach((eventSource, i) => {
      eventSource.setIndex(i)
      _resolveEventState(eventSource, {
        currentWrapper: currentWrapperMetrics,
        lastEvent: lastEventMetrics,
        lastKey: lastKeyMetrics,
        lastKeyPos: lastKeyPos,
        scrollPos: scrollPos
      })
    })
  })

  // Listen to resize events and positions fixed event keys to keep them in them
  // correct location.
  resizeInstance = resizeSource.subscribe(() => {
    fluidTimelineEvents.forEach((eventSource) => {
      if (!eventSource.isStatic()) {
        const left = eventSource.getCoords().left +
          eventSource.getKeyCoords().staticOffsetLeft
        eventSource.setKeyState({
          left: `${ left }px`
        })
      }
    })
  })

  return {
    bindEvent,
    destroy
  }
}
