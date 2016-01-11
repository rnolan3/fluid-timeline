import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import StickyList from 'sticky-list'

import ListItem from './listItem'
import exampleData from '../../__common__/exampleData'

const List = React.createClass({

  propTypes: {
    items: PropTypes.array
  },

  getDefaultProps () {
    return {
      items: exampleData
    }
  },

  componentWillMount () {
    this._stickyListItems = []
  },

  componentDidMount () {
    // Instantiating fluid timeline.
    this._stickyList = StickyList(ReactDOM.findDOMNode(this.refs.stickyList))
    // Binding items to fluid timeline.
    this._stickyListItems.forEach((item) => {
      this._stickyList.bindItem(ReactDOM.findDOMNode(item))
    })
  },

  componentWillUnmount () {
    this._stickyList.unsubscribe()
  },

  renderListItems () {
    return this.props.items.map((e, key) => {
      return (<ListItem
          body={ e.body }
          key={ key }
          ref={ (ref) => this._stickyListItems.push(ref) }
          itemKey={ key } />)
    })
  },

  render () {
    return (
      <div ref="stickyList">
        { this.renderListItems() }
      </div>
    )
  }

})

export default List
