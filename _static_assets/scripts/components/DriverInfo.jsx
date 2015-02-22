var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var DriverInfo = React.createClass({
    getInitialState: function() {
       return {
         driver: {}
       };
    },
    componentWillMount: function() {
      this.getDriverAjax();
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
    getDriverAjax: function() {
      $.post('/driver/')
      .done(this.getDriverDone)
      .fail(function(err) {
        console.log(err);
       });
    },
    getDriverDone: function(data) {
       console.log(data);
       this.setState({driver: data});
    }
});

module.exports = DriverInfo;
