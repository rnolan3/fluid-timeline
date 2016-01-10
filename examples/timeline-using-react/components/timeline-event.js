import React, { PropTypes } from 'react'

const TimelineEvent = React.createClass({

  propTypes: {
    description: PropTypes.string.isRequired,
    year: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  },

  render () {
    const { description, year } = this.props

    return (
      <article className="fluid-event">
        <h2 className="fluid-event-key">{ year }</h2>
        <div>
          <p>{ description }</p>
        </div>
      </article>
    )
  }

})

export default TimelineEvent
