var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var DriverList = React.createClass({
    getInitialState: function() {
    		     return {
		     	    drivers: []
		     };
    },
    componentWillMount: function() {
    			this.getDriversAjax();
    },
    render: function() {    
    	return (
	    	<div>
				<ul>
					{this.renderDriversList(this.state.drivers)}
				</ul>	    	   
			</div>
	    );
    },
    renderDriversList: function(drivers) {
	    return _.map(drivers, function(driver) {
      	     return (
	     	    <li className="list-unstyled">
		    	{driver.name} - {driver.phone}
		    </li>
	     );
    	}, this);
    },
    getDriversAjax: function() {
    	$.post('/driver/')
			.done(this.getDriversDone)
			.fail(function(err) { 
				console.log(err); 
		   });
    },
    getDriversDone: function(data) {
		   this.setState({drivers: data});
    }
});

module.exports = DriverList;