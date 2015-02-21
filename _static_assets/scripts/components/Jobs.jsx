var _ = require('lodash'),
	$ = require('jquery'),
	React = require('react');


var jobs = [{


}];	

var Jobs = React.createClass({
	render: function() {
		return (
			<div>

				<ul>
					{this.renderJobsList()}
				</ul>



			</div>
		);
	},
	renderJobsList: function(jobs) {
		return _.map(jobs, function(job) {
			return (
				<li className="list-unstyled">


				</li>
			);
		}, this);
	},
	expandCard: function() {
		// 
		// 
		// 
		// 
		// 
	},
	getJobsAjax: function() {
		// $.ajax({
		// 	type: "POST",
  // 			url: "job/list",
  // 			data: {},
  // 			dataType: 'jsonp'
		// })
		$.get('job/list')
		.done(this.getJobsDone)
		.fail(function(err) {
			console.log(err);
		});
	},
	getJobsDone: function(data) {
		console.log(data);
	}
});

module.exports = Jobs;