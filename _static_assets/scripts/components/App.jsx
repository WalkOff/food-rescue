var React = require('react'),
	Profile = require('./Profile.jsx');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<nav className="navbar navbar-default navbar-inverse navbar-fixed-top">
					<div className="container-fluid">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<a className="navbar-brand" href="#">412 Food Rescue App</a>
						</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav navbar-right">
								<li className="dropdown">
									<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
										My Profile<span className="caret"></span>
									</a>
									<ul className="dropdown-menu" role="menu">
										<li><a href="#">Action</a></li>
										<li><a href="#">Another action</a></li>
										<li><a href="#">Something else here</a></li>
										<li className="divider"></li>
										<li><a href="#">Separated link</a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>

				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<form>

								<div class="form-group">
									<label for="exampleInputEmail1">Company/Organization</label>
									<input type="text" class="form-control" value="East End Food Co-op" />
								</div>

								<div class="form-group">
									<label for="exampleInputEmail1">Pick-up Address</label>
									<input type="address" class="form-control" value="7516 Meade St, Pittsburgh, PA 15208" />
								</div>

								<div class="form-group">
									<label for="exampleInputEmail1">Phone Number</label>
									<input type="phone" class="form-control" value="(412) 242-359" />
								</div>

								<div className="form-group">
									Is it okay for your driver to text you?

									<div class="radio">
										<label>
											<input type="radio" name="textOk" value="yes" checked />
											Yes
										</label>
									</div>

									<div class="radio">
										<label>
											<input type="radio" name="textOk" value="no" />
											No
										</label>
									</div>
								</div>



								<div className="form-group">
									<label>
										Does this require a truck, or will car suffice?
										<textarea class="form-control" rows="3"></textarea>
									</label>
								</div>



								<div className="form-group">
									<label>
										Specific pick-up instructions
										<textarea class="form-control" rows="3"></textarea>
									</label>
								</div>

								<button className="btn btn-default"
										onClick={this.submitInfo}>
									Submit
								</button>

							</form>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12">
							<button className="btn btn-primary btn-large" onClick={this.requestPickup}>
								Request Pickup
							</button>
						</div>
					</div>
				</div>

			</div>
		);
	},
	renderTimeDropdownFrom: function() {
		// 30min, 1h, 2h (drop-down)
		// 6:30am-8am
		// Tomorrow morning

								// <div className="form-group">
								// 	*Time Frame
								// 	<label>
								// 		From
								// 		{this.renderTimeDropdownFrom()}
								// 	</label>
								// 	<label>
								// 		To
								// 		{this.renderTimeDropdownTo()}
								// 	</label>
								// </div>



		return (	
			<select class="form-control">
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
			<select class="form-control">
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
	submitInfo: function() {
		console.log('submit info');
	},
	requestPickup: function() {
		console.log('rp');
	},
	showProfile: function() {
		console.log('show profile');
	},
	editProfile: function() {
		console.log('edit profile');
	}
});

module.exports = App;