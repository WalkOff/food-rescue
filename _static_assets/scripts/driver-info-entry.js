require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
    DriverInfo = require('./components/DriverInfo.jsx');

React.initializeTouchEvents(true);
React.render(<DriverInfo />, document.getElementById('app-container'));
