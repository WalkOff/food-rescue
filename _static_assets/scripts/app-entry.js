require('bootstrap/dist/css/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
	App = require('./components/App.jsx');

React.render(<App />, document.getElementById('app-container'));