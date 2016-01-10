import '../__common__/styles.less'

import React from 'react'
import Timeline from './components/timeline'
import ReactDOM from 'react-dom'

const targetId = 'app'
const target = document.getElementById(targetId)

if (!target) {
  throw new Error(`Could not find a taget '${ targetId }'`)
}

ReactDOM.render(<Timeline />, target)
