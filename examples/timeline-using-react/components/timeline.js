import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TimelineEvent from './timeline-event'

import dummyData from '../../__common__/example-events'
import fluidTimeline from 'fluid-timeline'

const Timeline = React.createClass({

  propTypes: {
    events: PropTypes.array,
    title: PropTypes.string
  },

  getDefaultProps () {
    return {
      events: dummyData,
      title: 'Fluid Timeline Using React'
    }
  },

  componentWillMount () {
    this._timelineEvents = []
    // Instantiating fluid timeline.
    this._timeline = fluidTimeline()
  },

  componentDidMount () {
    // Binding events to fluid timeline.
    this._timelineEvents.forEach((e) => {
      this._timeline.bindEvent(ReactDOM.findDOMNode(e))
    })
  },

  componentWillUnmount () {
    this._timeline.unsubscribe()
  },

  renderTimelineEvents () {
    return this.props.events.map((e, key) => {
      return (<TimelineEvent
          description={ e.description }
          key={ key }
          ref={ (ref) => this._timelineEvents.push(ref) }
          year={ e.year } />)
    })
  },

  render () {
    return (
      <div>
        <header>
          <h2>{ this.props.title }</h2>
        </header>
        { this.renderTimelineEvents() }
      </div>
    )
  }

})

export default Timeline
