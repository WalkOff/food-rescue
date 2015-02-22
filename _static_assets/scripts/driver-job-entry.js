require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
	DriverJob = require('./components/DriverJob.jsx');

React.initializeTouchEvents(true);
React.render(<DriverJob jobId={jobId}/>, document.getElementById('job-container'));