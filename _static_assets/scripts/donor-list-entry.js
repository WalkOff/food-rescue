require('../styles/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
    DonorList = require('./components/DonorList.jsx');

React.initializeTouchEvents(true);
React.render(<DonorList />, document.getElementById('app-container'));
