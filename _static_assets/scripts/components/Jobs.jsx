var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react');

var Jobs = React.createClass({
	propTypes: {
    	jobsUrl: React.PropTypes.string
    },
	getInitialState: function() {
		return { 
			jobs: []
		};
	},
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<h2>Jobs Queue</h2>
					<ul className="jobs-list col-xs-12">
						{this.renderJobsList(this.state.jobs)}
					</ul>
				</div>
			</div>
		);
	},
	componentDidMount: function() {
		this.getJobsAjax();
	},
	renderJobsList: function(jobs) {
		return _.map(jobs, function(job) {
			// {job.accepted_by_phone}
			// {job.accepted_by_name}
			// {job.should_notify_donor}
			// {job.is_okay_to_text}
			// {job.is_truck_required}
			return (
				<li className="list-unstyled jobs-list-item row" onClick={this.navToJob.bind(this, job)}>

					<div className="col-xs-3">
						<dl className="">
							<dt>Location: </dt>
							<dd>{job.pickup_location}</dd>

							<dt>Donor name: </dt>
							<dd>{job.donor_name}</dd>

							<dt>Donor Phone: </dt>
							<dd>{job.contact_phone}</dd>
                            <dt>Take this job!</dt>
                            <dd><a href={"/driver/job/" + job.ndb_id}>TAKE</a> </dd>
						</dl>
					</div>
					
					<div className="col-xs-3">
						<dl className="">
							<dt>Drop off Location: </dt>
							<dd>{job.drop_off_location}</dd>
							<dt>Drop off Name: </dt>
							<dd>{job.drop_off_name}</dd>
							<dt>Drop off Phone: </dt>
							<dd>{job.drop_off_phone}</dd>
						</dl>
					</div>

					<div className="col-xs-3">
						<dl className="">
							<dt>From: </dt>
							<dd>{job.timeframe_start}</dd>
							<dt>To: </dt>
							<dd>{job.timeframe_end}</dd>
						</dl>
					</div>

					<div className="col-xs-3">
						<dl className="">
							<dt>Status: </dt>
							<dd className="job-status">{job.status}</dd>

							<dt>Description: </dt>
							<dd className="job-description">{job.description}</dd>

							<dt>Instructions: </dt>
							<dd className="job-instructions">{job.instructions}</dd>
						</dl>
					</div>

				</li>
			);
		}, this);
	},
	expandCard: function() {
	},
	getJobsAjax: function() {  
		$.post(this.props.jobsUrl)
		.done(this.getJobsDone)
		.fail(function(err) {
			console.log(err);
		});
	},
	getJobsDone: function(data) {
		this.setState({jobs: data});
	},
	navToJob: function(job) { 
		console.log(job.ndb_id);
		console.log(this.props);
		//window.location = this.props.jobsUrl + job.ndb_id;
	}
});

module.exports = Jobs;