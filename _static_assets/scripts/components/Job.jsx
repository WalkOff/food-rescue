var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var Job = React.createClass({
    propTypes: {
        job: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
            job: {},
            jobId: "asdf"
        };
    },
    getInitialState: function() {
        return {
            job: this.props.job
        };
    },
    componentDidMount: function() {
    	this.getJobAjax();
    },
    render: function() {
        var job = this.state.job;

	    return (
            <div className="job" onClick={this.navToJob}>

                <div className="col-xs-3">
                    <dl className="">
                        <dt>Location: </dt>
                        <dd>{job.pickup_location}</dd>

                        <dt>Donor name: </dt>
                        <dd>{job.donor_name}</dd>

                        <dt>Donor Phone: </dt>
                        <dd>{job.contact_phone}</dd>
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
	      </div>
	    );
// full obj for reference
// accepted_by_id: null
// accepted_by_name: null
// accepted_by_phone: null
// contact_phone: "123-123-1234"
// description: "Pick up food from catering event"
// donor_id: "ag9kZXZ-Zm9vZC1yZXNjdWVyEgsSBURvbm9yGICAgICAoIgKDA"
// donor_name: "Good Will"
// drop_off_id: null
// drop_off_location: null
// drop_off_name: null
// drop_off_phone: null
// instructions: "Do this thing and another thing"
// is_okay_to_text: true
// is_truck_required: true
// ndb_id: "ag9kZXZ-Zm9vZC1yZXNjdWVyEAsSA0pvYhiAgICAgKCICQw"
// pickup_location: {city: "Pittsburgh", state: "PA", address1: "123 Street Dr", address2: "Floor 2", zipcode: "15239"}
// address1: "123 Street Dr"
// address2: "Floor 2"
// city: "Pittsburgh"
// state: "PA"
// zipcode: "15239"
// should_notify_donor: true
// status: "submitted"
// timeframe_end: "2015-02-22 02:20:30.290322"
// timeframe_start: "2015-02-22 02:20:30.290316"
    },
    navToJob: function() {
        this.props.navToJob(this.props.job);
    },
    getJobAjax: function() {
      $.post('/job/',{id: this.props.jobId})
       	.done(this.getJobDone)
    	.fail(function(err) {
     	  console.log(err);
    	});
    },
    getJobDone: function(data) {
        this.setState({job: data[0]});
    }
});

module.exports = Job;