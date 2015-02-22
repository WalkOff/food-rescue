var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react'),
	Nav = require('./Nav.jsx'),
	Profile = require('./Profile.jsx'),
	DonorForm = require('./DonorForm.jsx');

var App = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	render: function() {
		return (
			<div>
				<Nav />

				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<DonorForm donationRequest={this.state.donationRequest} onFormSubmit={this.submitInfoAjax} />
						</div>
					</div>
				</div>
			</div>
		);
	},
	submitInfoAjax: function(donorForm) {
    	$.post('/job/new',{job: JSON.stringify(donorForm)})
        .done(this.getSubmitDone)
        .fail(function(err) { 
            console.log(err); 
        });
	},
    getSubmitDone: function(data) {
    	var parsedData = JSON.parse(data);
		this.setState({donor: parsedData});
    },
	showProfile: function() {
		console.log('show profile');
	},
	editProfile: function() {
		console.log('edit profile');
	}
});

module.exports = App;