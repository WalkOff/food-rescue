require('../styles/bootstrap.css');
require('../styles/main.css');

var $ = require('jquery'),
    React = require('react'),
    Jobs = require('./components/Jobs.jsx');

React.render(<Jobs jobsUrl={$(["data-jobsurl"]).attr('data-jobsurl')} />, document.getElementById('jobs-container'));
