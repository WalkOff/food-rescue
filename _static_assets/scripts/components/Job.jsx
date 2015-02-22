var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react/addons');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Job = React.createClass({
    propTypes: {
        job: React.PropTypes.object,
        showDetails: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            job: {},
            jobId: "asdf",
            showDetails: false
        };
    },
    getInitialState: function() {
        return {
            job: this.props.job,
            showDetails: false
        };
    },
    componentDidMount: function() {
    	this.getJobAjax();
    },
    render: function() {
        var job = this.state.job;

	    return (
            <div className="job col-lg-12 col-xs-12">
                {this.renderJobBase(this.state.job)}
                
                    {this.state.showDetails && this.renderJobDetails(this.state.job)}
                        
            </div>
	    );

// accepted_by_id: null
// accepted_by_name: null
// accepted_by_phone: null
// contact_phone: "123-123-1234"
// description: "Pick up food from catering event"
// donor_id: "ag9kZXZ-Zm9vZC1yZXNjdWVyEgsSBURvbm9yGICAgICAoIgKDA"

// drop_off_id: null
// drop_off_location: null
// drop_off_name: null
// drop_off_phone: null
// instructions: "Do this thing and another thing"
// is_okay_to_text: true
// is_truck_required: true
// ndb_id: "ag9kZXZ-Zm9vZC1yZXNjdWVyEAsSA0pvYhiAgICAgKCICQw"
// should_notify_donor: true
// timeframe_end: "2015-02-22 02:20:30.290322"
// timeframe_start: "2015-02-22 02:20:30.290316"
    },
    renderJobBase: function(job) {
        return (
            <div className="job-base row">
                <div className="col-lg-11 col-xs-9">
                    <dl className="">
                        <div className="col-lg-5 col-xs-12" onClick={this.navToJob}>
                            <dt>Organization: </dt>
                            <dd className="job-base-org-name"><a>{job.donor_name}</a></dd>
                        </div>
                        <div className="col-lg-7 col-xs-12">
                            <dt>Pick-up Location: </dt>
                            <dd className="job-base-address">
                                <span className="address-text">{job.pickup_location.address1}</span>
                                <span className="address-text">{job.pickup_location.address2}</span>
                                <span className="address-text">{job.pickup_location.city}</span>
                                <span className="address-text">{job.pickup_location.state}</span>
                                <span className="address-text">{job.pickup_location.zipcode}</span>
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="col-lg-1 col-xs-3">  
                    <span className="job-base-status">{job.status}</span>
                    <span className="show-job-details" onClick={this.toggleDetails}>
                        {this.state.showDetails ? "Hide details" : "Show details"}
                    </span>
                </div>
            </div>
        );
    },
    renderJobDetails: function(job) {
        // <dt>From</dt>
        // <dd>{job.timeframe_start}</dd>
        // <dt>To</dt>
        // <dd>{job.timeframe_end}</dd>
        return (
            <div className="job-details">
                <div className="col-xs-3">
                    <dl className="dl-horizontal">
                        <dt>Phone</dt>
                        <dd>{job.contact_phone}</dd>
                        <dt>Description</dt>
                        <dd>{job.description}</dd>
                        <dt>Instructions</dt>
                        <dd>{job.instructions}</dd>
                    </dl>
                </div>
            </div>
        );
    },
    renderDropoffDetails: function() {
        return (
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
        );
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
    },
    toggleDetails: function() {
        this.setState({showDetails: !this.state.showDetails});
    }
});

module.exports = Job;