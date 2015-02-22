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
        this.getDropOffAjax();
    },
    render: function() {
        if(this.state.job != null)
        {
            console.log(this.state.job);
    	    return (
	      <div className="job">
            {this.state.job.description}

              Assign Drop Off:

	      </div>
	    );
    } else{
            return (<div className="job">{this.state.msg}</div>);
        }
    },
    getJobAjax: function() {
      $.post('/admin/job/' + this.props.jobId)
       	.done(this.getJobDone)
	.fail(function(err) {
 	  console.log(err);
	});
    },
    getJobDone: function(data) {
      var parsedData = JSON.parse(data);
      this.setState({job: parsedData});

    },
    getDropOffAjax: function() {
      $.get('/admin/drop_off/all')
       	.done(this.getDropOffDone)
	.fail(function(err) {
 	  console.log(err);
	});
    },
    getDropOffDone: function(data) {
      var parsedData = JSON.parse(data);
      this.setState({dropOffs: parsedData});

    }
});

module.exports = Job;