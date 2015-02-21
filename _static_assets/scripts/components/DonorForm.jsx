var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react');

//todo: generate a list of times based on the date
var times = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'];

var DonorForm = React.createClass({
	render: function() {
		return (
			<form>

				<div className="form-group">
					<label for="exampleInputEmail1">Company/Organization</label>
					<input type="text" className="form-control" value="East End Food Co-op" />
				</div>

				<div className="form-group">
					<label for="exampleInputEmail1">Pick-up Location</label>
					<input type="address" className="form-control" value="7516 Meade St, Pittsburgh, PA 15208" />
				</div>


				<div className="form-group">
					<label for="exampleInputEmail1">Contact Name</label>
					<input type="text" className="form-control" value="Joe Smith" />
				</div>

				<div className="form-group">
					<label for="exampleInputEmail1">Contact Number</label>
					<input type="phone" className="form-control" value="(412) 242-359" />
				</div>

				<div className="form-group">
					Is it okay for your driver to text you?

					<div className="radio">
						<label>
							<input type="radio" name="textOk" value="yes" checked />
							Yes
						</label>
					</div>

					<div className="radio">
						<label>
							<input type="radio" name="textOk" value="no" />
							No
						</label>
					</div>
				</div>


				<div className="form-group">
					Does this require a truck, or will car suffice?

					<div className="checkbox">
						<label>
							<input type="checkbox" name="truck" value="yes" checked />
							Truck
						</label>
					</div>
				</div>


				<div className="form-group">
					<label>
						What food items will you be donating?
						<textarea className="form-control" rows="3" placeholder="I have 25 pounds of broccoli and 10 pounds of sweet potatoes"></textarea>
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
						<textarea className="form-control" rows="3" placeholder="pick up will be easier if driver parks at back entrance"></textarea>
					</label>
				</div>

				<button className="btn btn-default"
						onClick={this.submitInfo}>
					Submit
				</button>

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
	formSubmit: function() {
		var donationRequest = {};

		this.props.onFormSubmit(donationRequest);
	}
});

module.exports = DonorForm;