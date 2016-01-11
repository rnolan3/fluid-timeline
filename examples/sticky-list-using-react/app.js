import '../__common__/styles.less'

import React from 'react'
import List from './components/list'
import ReactDOM from 'react-dom'

const targetId = 'app'
const target = document.getElementById(targetId)

if (!target) {
  throw new Error(`Could not find a taget '${ targetId }'`)
}

ReactDOM.render(<List />, target)
