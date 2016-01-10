import '../__common__/styles.less'
import fluidTimeline from 'fluid-timeline'

const timeline = fluidTimeline(document.getElementById('timeline'))
const events = document.getElementsByClassName('fluid-event')
const eventsLength = events.length

for (let e = 0; e < eventsLength; e++) {
  timeline.bindEvent(events[e])
}
