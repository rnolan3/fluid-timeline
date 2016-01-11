import React, { PropTypes } from 'react'

const ListItem = React.createClass({

  propTypes: {
    body: PropTypes.string.isRequired,
    itemKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  },

  render () {
    let { body, itemKey } = this.props

    if (itemKey < 10) {
      itemKey = '0' + itemKey
    }

    return (
      <article className="sticky-list-item">
        <h2 className="sticky-list-item-key">{ itemKey }</h2>
        <div>
          <p>{ body }</p>
        </div>
      </article>
    )
  }

})

export default ListItem
