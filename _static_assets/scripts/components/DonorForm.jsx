var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react/addons');

//todo: generate a list of times based on the date
var times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'];

var DonorForm = React.createClass({
	mixins: [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			contact_phone: '(412) 242-359',
			description: 'lots of potatoes',
			donor_name: 'East End Food Co-op',
			donor_location: '7516 Meade St, Pittsburgh, PA 15208',
			instructions: '',
			is_ok_to_text: true,
			is_truck_required: false
		};
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
					<input type="address" className="form-control" valueLink={this.linkState('donor_location')} />
				</div>

				<div className="form-group">
					<label>Contact Number</label>
					<input type="phone" className="form-control" valueLink={this.linkState('contact_phone')} />
				</div>


				<div className="form-group">
					Is it okay for your driver to text you?

					<div className="checkbox">
						<label>
							<input type="checkbox" checkedLink={this.linkState('is_ok_to_text')} />
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
						<textarea className="form-control" rows="3" valueLink={this.linkState('description')} placeholder="I have 25 pounds of broccoli and 10 pounds of sweet potatoes"></textarea>
					</label>
				</div>


				<div className="form-group">
					Date
					<input type="date" className="form-control" />

					Time Frame
					<label>
						From
						{this.renderTimeDropdownFrom()}
					</label>
					<label>
						To
						{this.renderTimeDropdownTo()}
					</label>
				</div>

				<div className="form-group">
					<label>
						Are there any specific pick up instructions for the driver?
						<textarea className="form-control" rows="3" valueLink={this.linkState('instructions')} placeholder="pick up will be easier if driver parks at back entrance"></textarea>
					</label>
				</div>


				<button className="btn btn-default">Submit</button>
			</form>
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