var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var Job = React.createClass({
    propTypes: {
        jobId: React.PropTypes.string
    },
    getInitialState: function() {
        return {job: null,msg:"wait for job details"};
    },
    componentDidMount: function() {
    	this.getJobAjax();
    },
    render: function() {
        if(this.state.job != null)
        {
            console.log(this.state.job);
    	    return (
	      <div className="job">
            {this.state.job.description}
            <button className="btn btn-primary" onClick={this.takeJobAjax}>I Will Do It!</button>
            <button className="btn btn-primary">No Thanks!</button>
	      </div>
	    );
    } else{
            return (<div className="job">{this.state.msg}</div>);
        }
    },
    getJobAjax: function() {
      $.post('/driver/job/' + this.props.jobId)
       	.done(this.getJobDone)
	.fail(function(err) {
 	  console.log(err);
	});
    },
    getJobDone: function(data) {
      var parsedData = JSON.parse(data);
      this.setState({job: parsedData});

    },
    takeJobAjax: function() {
      $.post('/driver/take/job/' + this.props.jobId)
       	.done(this.getJobDone)
	.fail(function(err) {
 	  console.log(err);
    });},
    takeJobDone: function(data) {
      this.setState({job: null,msg:"thank you!"});
    }
});

module.exports = Job;