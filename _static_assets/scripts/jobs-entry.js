require('../styles/bootstrap.css');
require('../styles/main.css');

var $ = require('jquery'),
    React = require('react'),
    Jobs = require('./components/Jobs.jsx');

React.initializeTouchEvents(true);
React.render(<Jobs jobsUrl={$("#jobs-container").data('jobsurl')} jobPrefix={$("#jobs-container").data('jobprefix')} />, document.getElementById('jobs-container'));