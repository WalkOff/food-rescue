var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react');


var Jobs = React.createClass({
	getInitialState: function() {
		return {
			jobs: []
		};
	},
	componentWillMount: function() {
		// this.getJobsAjax();
	},
	render: function() {
		return (
			<div>
				<ul>
					{this.renderJobsList(this.state.jobs)}
				</ul>
			</div>
		);
	},
	componentDidMount: function() {
		this.getJobsAjax();
	},
	renderJobsList: function(jobs) {
		return _.map(jobs, function(job) {
			// {job.status}
			// {job.accepted_by_phone}
			// {job.instructions}
			// {job.contact_phone}
			// {job.accepted_by_name}
			// {job.description}
			// {job.should_notify_donor}
			// {job.timeframe_start}
			// {job.timeframe_end}
			// {job.drop_off_phone}
			// {job.is_okay_to_text}
			// {job.donor_name}
			// {job.address}
			// {job.drop_off_location}
			// {job.is_truck_required}
			// {job.drop_off_name}

			return (
				<li className="list-unstyled">
					{job.status}
				</li>
			);
		}, this);
	},
	expandCard: function() {
	},
	getJobsAjax: function() {
		$.get('/job/list')
		.done(this.getJobsDone)
		.fail(function(err) {
			console.log(err);
		});
	},
	getJobsDone: function(data) {
		var parsedData = JSON.parse( data );
		this.setState({jobs: parsedData});
	}
});

module.exports = Jobs;