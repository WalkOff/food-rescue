require('../styles/bootstrap.css');
require('../styles/main.css');
var $ = require('jquery')

var React = require('react'),
      Job = require('./components/Job.jsx')

React.initializeTouchEvents(true);
React.render(<Job jobId={$("#job-container").data("jobid")} />, document.getElementById('job-container'));
