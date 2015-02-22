var _     = require('underscore'),
    $     = require('jquery'),
    React = require('react');

var DriverInfo = React.createClass({
    getInitialState: function() {
       return {
         driver: _.extend(window.driver, {id: window.driverId})
       };
    },

    render: function() {
      return this.renderDriver(this.state.driver);
    },

    renderDriver: function(driver) {
      return (
        <div>
          <span>
            {driver.name} - {driver.phone}
          </span>
          <button onClick={this.updateStatus.bind(this, driver)}>{driver.is_active ? 'Activate': 'Deactivate'}</button>
        </div>

       );
    },
    updateStatus: function(driver) {
      var newStatus = !driver.is_active;
      $.post('/driver/status', {driverId: driver.id, status: newStatus})
      .done(function() {
        driver.is_active = newStatus;
        this.setState({driver: driver});
      }.bind(this));
    },
});

module.exports = DriverInfo;
