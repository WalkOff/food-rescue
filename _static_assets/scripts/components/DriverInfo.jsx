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
        <div className="row">
          <div className="col-xs-12">
              Name: {driver.name}
          </div>
          <div className="col-xs-12">
              Phone: {driver.phone}
          </div>
          <div className="col-xs-12">
            <button onClick={this.updateStatus.bind(this, driver)}>{driver.is_active ? 'Activate': 'Deactivate'}</button>
          </div>
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
