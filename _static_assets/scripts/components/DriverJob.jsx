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
      if(this.state.job != null) {
        return (
          <div className="job">
              <p>Food Delivery opportunity to deliver </p>
              <dt>Food donated by</dt>
          <dd>{this.state.job.donor_name}</dd>
              <dt>To be delivered to:</dt>
          <dd>{this.state.job.drop_off_name}</dd>
              <dt>Details:</dt>
          <dd>{this.state.job.description}</dd>

          <dt>Pick Up Location:</dt>
          <dd>
            <div>{this.state.job.pickup_location.address1}</div>
            {<div>this.state.job.pickup_location.address2}</div>
            <div>{this.state.job.pickup_location.city} {this.state.job.pickup_location.state} {this.state.job.pickup_location.zipcode}</div>
              <a target="_blank" href={"https://maps.google.com?saddr=Current+Location&daddr="+this.state.job.pickup_location.address1.replace(/\ /g,'+') + '+'+ this.state.job.pickup_location.city.replace(/\ /g,'+')+'+'+this.state.job.pickup_location.state.replace(/\ /g,'+') +'+'+this.state.job.pickup_location.zipcode.replace(' ','+') }>Map it!</a>
          </dd>

          <dt>Drop Off Location:</dt>

          <dd>{this.state.job.drop_off_location.address1}<br/>
          {this.state.job.drop_off_location.address2}<br/>
          {this.state.job.drop_off_location.city} {this.state.job.drop_off_location.state} {this.state.job.drop_off_location.zipcode}
             <a target="_blank" href={"https://maps.google.com?saddr=Current+Location&daddr="+this.state.job.drop_off_location.address1.replace(/\ /g,'+') + '+'+ this.state.job.drop_off_location.city.replace(/\ /g,'+')+'+'+this.state.job.drop_off_location.state.replace(/\ /g,'+') +'+'+this.state.job.drop_off_location.zipcode.replace(' ','+') }>Map it!</a>
          </dd>

            <button className="btn btn-primary" onClick={this.takeJobAjax}>Ill Do It!</button>

            <a href="#" onClick={this.rejectJob}>Continue Browsing</a>
            <button className="btn btn-primary" onClick={this.finishJobAjax}>All Done!</button>

          </div>
        );
      } else {
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
