var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var DriverInfo = React.createClass({
    getInitialState: function() {
       return {
         driver: window.driver
       };
    },
    render: function() {
      return (
        <div>
          {this.renderDriver(this.state.driver)}
        </div>
      );
    },
    renderDriver: function(driver) {
      return (
         <li className="list-unstyled">
          {driver.name} - {driver.phone}
        </li>
       );
    },
    getDriverDone: function(data) {
       console.log(data);
       this.setState({driver: data});
    }
});

module.exports = DriverInfo;
