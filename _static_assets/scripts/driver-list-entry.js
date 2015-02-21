require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
    DriverList = require('./components/DriverList.jsx');

React.render(<DriverList />, document.getElementById('app-container'));

