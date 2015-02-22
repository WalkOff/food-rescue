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
    	    return (
          <div className="job">
              <p>Food Delivery opportunity to deliver </p>
              <dt>Food donated by</dt>
          <dd>{this.state.job.donor_name}</dd>
              <dt>To be delivered to:</dt>
          <dd>{this.state.job.drop_off_name}</dd>
              <dt>Details:</dt>
          <dd>{this.state.job.description}</dd>
              Assign Drop Off:
          {this.renderDropOffDropdown()}
              <button className="btn btn-primary" onClick={this.updateDropOffInfo}>Update</button>
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
  renderDropOffDropdown: function() {
    return (
      <select className="form-control" onChange={this.dropOffChanged}>
        {this.renderDropOffDropdownOpts()}
      </select>
    );
  },
  renderDropOffDropdownOpts: function() {
    return _.map(drop_off_list, function(dropOff) {
      return (
        <option value={dropOff.ndb_id}>{dropOff.name}</option>
      );
    }, this);
  },
  dropOffChanged: function(e) {
    this.state.dropOffId = e.target.value;
    this.setState(this.state);
  },
    updateDropOffInfo: function() {
      $.post('/admin/job/assign/',{jobId: this.props.jobId,dropOffId: this.state.dropOffId})
       	.done(this.getDropOffAssignDone)
	.fail(function(err) {
 	  console.log(err);
	});
    },
    getDropOffAssignDone: function(data) {

    }
});

module.exports = Job;