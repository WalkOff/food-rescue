var React = require('react');

var Profile = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="profile panel col-xs-12">
						<h2>My Profile</h2>

						<dl className="dl-horizontal">
						  <dt>Organization Name: </dt>
						  <dd>Big Burrito</dd>

	  					  <dt>Address: </dt>
						  <dd>address here</dd>

	  					  <dt>Phone: </dt>
						  <dd>Big Burrito</dd>
						</dl>

						<p>To contact an administrator, call (888) 888-8888</p>

						<button className="btn btn-primary btn-large"
								onClick={this.editProfile}>
							Edit
						</button>

					</div>
				</div>
			</div>
		);
	}
});

module.exports = Profile;