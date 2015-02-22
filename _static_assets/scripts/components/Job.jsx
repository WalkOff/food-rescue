var _ = require('underscore'),
    $ = require('jquery'),
    React = require('react');

var Job = React.createClass({
    propTypes: {
        jobId: React.PropTypes.string
    },
    getInitialState: function() {
        return {job: null};
    },
    componentDidMount: function() {
    	this.getJobAjax();
    },
    render: function() {
    	    return (
	      <div className="job">
	        {this.state.job.Description}
	      </div>
	    );
    },
    getJobAjax: function() {
      $.post('/job/' + this.props.jobId)
       	.done(this.getJobDone)
	.fail(function(err) {
 	  console.log(err);
	});
    },
    getJobDone: function(data) {
      var parsedData = JSON.parse(data);
      this.setState({job: parsedData});
    }
});

module.exports = Job;