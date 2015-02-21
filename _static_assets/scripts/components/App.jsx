var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react'),
	Nav = require('./Nav.jsx'),
	Profile = require('./Profile.jsx'),
	DonorForm = require('./DonorForm.jsx');

var App = React.createClass({
	getInitialState: function() {
		return {
			showDonorForm: false
		};
	},
	render: function() {
		return (
			<div>
				<Nav />

				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							{this.state.showDonorForm ? this.renderDonorForm() : this.renderPickupButton()}
						</div>
					</div>
				</div>
			</div>
		);
	},
	renderDonorForm: function() {
		return (
			<DonorForm donationRequest={this.state.donationRequest} onFormSubmit={this.submitInfoAjax} />
		);
	},
	renderPickupButton: function() {
		return (
			<button className="btn btn-primary btn-large" onClick={this.requestPickup}>
				Request Pickup
			</button>
		);
	},
	submitInfoAjax: function(donorForm) {
    	$.post('/job/new',{donorForm: donorForm})
        .done(this.getSubmitDone)
        .fail(function(err) { 
            console.log(err); 
        });
	},
    getSubmitDone: function(data) {
    	var parsedData = JSON.parse(data);
		this.setState({donor: parsedData});
    },
	requestPickup: function() {
		this.setState({
			showDonorForm: true
		});
	},
	showProfile: function() {
		console.log('show profile');
	},
	editProfile: function() {
		console.log('edit profile');
	}
});

module.exports = App;