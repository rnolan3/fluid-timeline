import '../__common__/styles.less'
import fluidTimeline from 'fluid-timeline'

const numberOfTimelines = 2
const baseTimelineIdentifier = 'timeline'

function initTimeline (index) {
  let timeline = document.getElementById(baseTimelineIdentifier + index)
  let timelineEvents = timeline.getElementsByClassName('fluid-event')

  // Initializing fluid timeline.
  let ft = fluidTimeline(timeline)

  // Binding events to fluid timeline.
  for (let e = 0; e < timelineEvents.length; e++) {
    ft.bindEvent(timelineEvents[e])
  }
}

for (let i = 1; i <= numberOfTimelines; i++) {
  initTimeline(i)
}
