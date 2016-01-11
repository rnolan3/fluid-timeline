# Fluid Timeline

A framework agnostic javascript module that applies a fluid animation to your timeline.

## Installation

```
npm install fluid-timeline
```

## Usage

Start by including the timeline event in module.

```
import fluidTimeline from 'fluid-timeline';
```

Alternatively you can use the UMD.

Next, you'll want to instantiate your timeline.

```
// Vanilla JS
var events = document.getElementById('fluid-events');
// Jquery
var events = $('.events');

var timeline = fluidTimeline();

// Bind timeline events
for (var i = 0; i < events.length; i++) {
  timeline.createEvent(events);
}
```

Or if you're a crazy cool kid and use React, it'll look something like this.

```

var TimelineEvent = React.createClass({

  render () {
    var { year, title } = this.props;

    return (
      <div>
        <h1>{ year }</h1>
        <h2>{ title }</h2>
      </div>
    );
  }

});

var Timeline = React.createClass({

  getDefaultProps () {
    return {
      events: [
        { year: 2015, title: 'My second life experience. Neat.' },
        { year: 2014, title: 'My first life experience.' }
      ]
    };
  },

  componentWillMount () {
    this._timelineEvents = [];
    this._timeline = fluidTimeline();
  }

  componentDidMount () {
    this._timelineEvents.forEach((e) => {
      this._timeline.createEvent(ReactDOM.findDOMNode(e));
    });
  },

  renderTimelineEvents () {
    return this.props.events.forEach((e, key) => {
      return (<TimelineEvent
          description={ e.description }
          key={ key }
          ref={ (ref) => this._timelineEvents.push(ref) }
          year={ e.year } />);
    });
  }

  render () {
    return (
      <div>
        { this.renderTimelineEvents() }
      </div>
    )
  }

});

```

## Configuration

The `createEvent` method has a single configuration option to change the key className.

```

{
  // This is used to query the node and change the state of the
  // key (fixed or not fixed).
  keyClassName:   String  
}

```
