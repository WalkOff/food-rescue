require('../styles/bootstrap.css');
require('../styles/main.css');
var $ = require('jquery')

var React = require('react'),
	AdminJob = require('./components/AdminJob.jsx');


React.render(<AdminJob jobId={$("#job-container").data("jobid")}/>, document.getElementById('job-container'));