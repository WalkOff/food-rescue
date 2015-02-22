var _ = require('underscore'),
	$ = require('jquery'),
	React = require('react'),
	Nav = require('./Nav.jsx'),
	Job = require('./Job.jsx');

var Jobs = React.createClass({
	propTypes: {
    	jobsUrl: React.PropTypes.string,
        jobPrefix:React.PropTypes.string
    },
    getDefaultProps: function() {
    	return {
    		jobsUrl: '',
            jobPrefix:''
    	};
    },
	getInitialState: function() {
		return { 
			jobs: []
		};
	},
	render: function() {
		return (
			<div>
				<Nav />

				<div className="container">
					<div className="row">
						<h2>Jobs Queue</h2>
						<ul className="jobs-list col-xs-12">
							{this.renderJobsList(this.state.jobs)}
						</ul>
					</div>
				</div>
			</div>
		);
	},
	componentDidMount: function() {
		this.getJobsAjax();
	},
	renderJobsList: function(jobs) {
		return _.map(jobs, function(job) {
			return (
				<li className="list-unstyled jobs-list-item row">
					<Job job={job} navToJob={this.navToJob} />
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
		console.log('navToJob');
		console.log(job.ndb_id);
		console.log(this.props);
        console.log(this.props.jobPrefix);
		window.location = this.props.jobPrefix + job.ndb_id;
	}
});

module.exports = Jobs;