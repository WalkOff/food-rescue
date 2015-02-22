var _ = require('underscore'),
$ = require('jquery'),
React = require('react');

var Job = React.createClass({
    propTypes: {
      jobId: React.PropTypes.string
    },
    getInitialState: function() {
      return {job: null, msg:"Waiting for job details"};
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
          <button className="btn btn-primary" onClick={this.takeJobAjax}>I'll Do It!</button>
          <br/><a href="#" onClick={this.rejectJob}>Continue Browsing</a>
              <br/>
            <button className="btn btn-primary" onClick={this.finishJobAjax}>All Done!</button>
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
      .done(function() {
        this.setState({job: null, msg:"The donor and the destination have been informed. Thank you for making a difference in your community! "});
      }.bind(this))
      .fail(function(err) {
        console.log(err);
    });},
    finishJobAjax: function() {
      $.post('/driver/finish/job/' + this.props.jobId)
      .done(function() {
        this.setState({job: null, msg:"Thank you for making a difference in your community! "});
      }.bind(this))
      .fail(function(err) {
        console.log(err);
    });},
    rejectJob: function() {
      window.location.href = '/job'
    }
});

module.exports = Job;
