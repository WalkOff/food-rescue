require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
	Jobs = require('./components/Jobs.jsx');

React.render(<Jobs />, document.getElementById('jobs-container'));