require('../styles/bootstrap.css');
require('../styles/main.css');
var $ = require('jquery')

var React = require('react'),
      Job = require('./components/Job.jsx')

React.render(<Job jobId={$(["data-jobid"])} />, document.getElementById('job-container'));
