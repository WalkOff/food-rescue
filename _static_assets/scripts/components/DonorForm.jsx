var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react/addons');

//todo: generate a list of times based on the date
// var times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'];

var DonorForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			contact_phone: '',
			description: 'lots of potatoes',
			donor_id: 'asdf',
			donor_name: 'East End Food Co-op',
			instructions: '',
			is_okay_to_text: true,
			is_truck_required: false,
			pickup_address1: '7516 Meade St',
			pickup_address2: '',
			pickup_city: 'Pittsburgh',
			pickup_state: 'PA',
			pickup_zipcode: '15208',
			should_notify_donor: true,
			timeframe_start: '',
			timefrom_end: ''
		};
	},
	componentWillMount: function() {
		$.get('/job/current_donor')
		.done(this.prefillDone)
		.fail(function(err) {
			console.log(err);
		});
	},
	prefillDone: function(data) {
		console.log(data);

		//also: donor_email: data.email
		// address: {address2: null, address1: "501 W Waterfront Dr", zipcode: "15120", city: "West Homestead",…}
		// address1: "501 W Waterfront Dr"
		// address2: null
		// city: "West Homestead"
		// state: "PA"
		// zipcode: "15120"
		// email: "jessieschalles@gmail.com"
		// name: "Costco - Waterfront Location"
		// ndb_id: "ag9kZXZ-Zm9vZC1yZXNjdWVyEgsSBURvbm9yGICAgICAwO8IDA"
		// phone: "4044466348"

		this.setState({
			contact_phone: data.phone,
			donor_id: data.ndb_id,
			donor_name: data.name,
			pickup_address1: data.address.address1,
			pickup_address2: data.address.address2,
			pickup_city: data.address.city,
			pickup_state: data.address.state,
			pickup_zipcode: data.address.zipcode
		});
	},
	render: function() {
		return (
			<form onSubmit={this.formSubmit}>
				<div className="form-group">
					<label>Company/Organization</label>
					<input type="text" className="form-control" valueLink={this.linkState('donor_name')} />
				</div>

				<div className="form-group">
					<label>Pick-up Location</label>

        			<input type="address1" className="form-control" valueLink={this.linkState('pickup_address1')} />
        			<input type="address2" className="form-control" valueLink={this.linkState('pickup_address2')} />
        			<input type="city" className="form-control" valueLink={this.linkState('pickup_city')} />
        			<input type="state" className="form-control" valueLink={this.linkState('pickup_state')} />
        			<input type="zipcode" className="form-control" valueLink={this.linkState('pickup_zipcode')} />
				</div>

				<div className="form-group">
					<label>Contact Number</label>
					<input type="phone" className="form-control" valueLink={this.linkState('contact_phone')} />
				</div>


				<div className="form-group">
					Is it okay for your driver to text you?

					<div className="checkbox">
						<label>
							<input type="checkbox" checkedLink={this.linkState('is_okay_to_text')} />
							Yes
						</label>
					</div>
				</div>


				<div className="form-group">
					Does this require a truck, or will car suffice?

					<div className="checkbox">
						<label>
							<input type="checkbox" checkedLink={this.linkState('is_truck_required')} />
							Truck is required
						</label>
					</div>
				</div>

				<div className="form-group">
					<label>
						What food items will you be donating?
						<textarea className="form-control" rows="3" valueLink={this.linkState('description')} 
								placeholder="I have 25 pounds of broccoli and 10 pounds of sweet potatoes">
						</textarea>
					</label>
				</div>

				<div className="form-group">
					<label>
						Are there any specific pick up instructions for the driver?
						<textarea className="form-control" rows="3" valueLink={this.linkState('instructions')} 
								placeholder="pick up will be easier if driver parks at back entrance">
						</textarea>
					</label>
				</div>

				<button className="btn btn-primary btn-large">Submit</button>
			</form>

			// <div className="form-group">
			// 	Date
			// 	<input type="date" className="form-control" />

			// 	Time Frame
			// 	<label>
			// 		From
			// 		{this.renderTimeDropdownFrom()}
			// 	</label>
			// 	<label>
			// 		To
			// 		{this.renderTimeDropdownTo()}
			// 	</label>
			// </div>
		);
	},
	renderTimeDropdownFrom: function() {
		// 30min, 1h, 2h (drop-down)
		// 6:30am-8am
		// Tomorrow morning

		return (	
			<select className="form-control">
				{this.renderTimeDropdownFromOpts()}
			</select>
		);
	},
	renderTimeDropdownFromOpts: function() {
		return _.map(times, function(time) {
			return (
				<option>{time}</option>
			);
		}, this);
	},
	renderTimeDropdownTo: function() {
		return (	
			<select className="form-control">
				{this.renderTimeDropdownToOpts()}
			</select>
		);
	},
	renderTimeDropdownToOpts: function() {
		return _.map(times, function(time) {
			return (
				<option>{time}</option>
			);
		}, this);
	},
	formSubmit: function(e) {
		e.preventDefault();
		this.props.onFormSubmit(this.state);
	}
});

module.exports = DonorForm;