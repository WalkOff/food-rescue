require('bootstrap/dist/css/bootstrap.css');
require('../styles/main.css');

var React = require('react'),
    DonorList = require('./components/DonorList.jsx');

React.render(<DonorList />, document.getElementById('app-container'));

