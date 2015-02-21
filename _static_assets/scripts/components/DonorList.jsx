var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var DonorList = React.createClass({
    getInitialState: function() {
	     return {
	     	 donors: []
	     };
    },
    componentWillMount: function() {
		this.getDonorsAjax();			
    },
    render: function() {    
	    return (
            <div>
                <ul>
                    {this.renderDonorsList(this.state.donors)}
                </ul>	    	   
            </div>
	    );
    },
    renderDonorsList: function(donors) { 
        return _.map(donors, function(donor) {
            return (
                <li className="list-unstyled">
                    {donor.name} - {donor.phone}
                </li>
            );
        }, this);
    },
    getDonorsAjax: function() {
        $.post('/admin/donor/')
        .done(this.getDonorsDone)
        .fail(function(err) { 
            console.log(err); 
        });
    },
    getDonorsDone: function(data) {
    	var parsedData = data;
		this.setState({donor: parsedData});
    }
});

module.exports = DonorList;