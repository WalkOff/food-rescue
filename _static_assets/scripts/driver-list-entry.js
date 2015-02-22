require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
    DriverList = require('./components/DriverList.jsx');

React.initializeTouchEvents(true);
React.render(<DriverList />, document.getElementById('app-container'));

