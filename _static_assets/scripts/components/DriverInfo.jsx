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
      return this.renderDriver(this.state.driver);
    },
    renderDriver: function(driver) {
      return (
        <div>
          {driver.name} - {driver.phone}
        </div>
       );
    },
    getDriverDone: function(data) {
       console.log(data);
       this.setState({driver: data});
    }
});

module.exports = DriverInfo;
