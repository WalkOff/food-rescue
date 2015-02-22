require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
	App = require('./components/App.jsx');

React.initializeTouchEvents(true);
React.render(<App />, document.getElementById('app-container'));