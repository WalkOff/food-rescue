var _ = require('underscore'),
  $ = require('jquery'),
  React = require('react/addons'),
  moment = require('moment');

function timeIntervals(endTime) {
  var timeStops = [];
  var startTime = moment().add('m', 15 - moment().minute() % 15);

  while(startTime <= endTime){
      timeStops.push(new moment(startTime));
      startTime.add('m', 15);
  }

  return timeStops;
}

var times = timeIntervals(moment().add('h', 12));

var DonorForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      contact_phone: '',
      description: 'lots of potatoes',
      donor_id: 'asdf',
      donor_name: 'East End Food Co-op',
      instructions: '',
      is_okay_to_text: true,
      is_truck_required: false,
      pickup_address1: '7516 Meade St',
      pickup_address2: '',
      pickup_city: 'Pittsburgh',
      pickup_state: 'PA',
      pickup_zipcode: '15208',
      should_notify_donor: true,
      timeframe_start: '',
      timefrom_end: ''
    };
  },
  componentWillMount: function() {
    $.get('/job/current_donor')
    .done(this.prefillDone)
    .fail(function(err) {
      console.log(err);
    });
  },
  prefillDone: function(data) {
    console.log(data);

    //also: donor_email: data.email
      // address: {address2: null, address1: "501 W Waterfront Dr", zipcode: "15120", city: "West Homestead",…}
      // address1: "501 W Waterfront Dr"
      // address2: null
      // city: "West Homestead"
      // state: "PA"
      // zipcode: "15120"
      // email: "jessieschalles@gmail.com"
      // name: "Costco - Waterfront Location"
      // ndb_id: "ag9kZXZ-Zm9vZC1yZXNjdWVyEgsSBURvbm9yGICAgICAwO8IDA"
      // phone: "4044466348"

    this.setState({
      day: "today",
      startTime: times[0],
      endTime:   times[5],
      contact_phone: data.phone,
      donor_id: data.ndb_id,
      donor_name: data.name,
      pickup_address1: data.address.address1,
      pickup_address2: data.address.address2,
      pickup_city: data.address.city,
      pickup_state: data.address.state,
      pickup_zipcode: data.address.zipcode
    });
  },
  render: function() {
    return (
      <form className="donor-form" onSubmit={this.formSubmit}>
        <div className="form-group">
          <label>Company/Organization</label>
          <input type="text" className="form-control" valueLink={this.linkState('donor_name')} />
        </div>

        <div className="form-group much-separate">
          <label>Pick-up Location</label>

            <label>
              <span className="text-muted">Address Line 1</span>
              <input type="address1" className="form-control addr" placeholder="Address Line 1" valueLink={this.linkState('pickup_address1')} />
            </label>
            <label>
              <span className="text-muted">Address Line 2</span>
              <input type="address2" className="form-control addr" placeholder="Address Line 2" valueLink={this.linkState('pickup_address2')} />
            </label>
            <label>
              <span className="text-muted">City</span>
              <input type="city" className="form-control addr" placeholder="City" valueLink={this.linkState('pickup_city')} />
            </label>
            <label>
              <span className="text-muted">State</span>
              <input type="state" className="form-control addr" placeholder="State" valueLink={this.linkState('pickup_state')} />
            </label>
            <label>
              <span className="text-muted">ZIP Code</span>
              <input type="zipcode" className="form-control addr" placeholder="ZIP Code" valueLink={this.linkState('pickup_zipcode')} />
            </label>
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input type="phone" className="form-control" valueLink={this.linkState('contact_phone')} />
        </div>


        <div className="form-group">
          <label>Is it okay for your driver to text you?</label>

          <div className="checkbox">
            <label>
              <input type="checkbox" checkedLink={this.linkState('is_okay_to_text')} />
              Yes
            </label>
          </div>
        </div>


        <div className="form-group">
          <label>Does this require a truck, or will car suffice?</label>

          <div className="checkbox">
            <label>
              <input type="checkbox" checkedLink={this.linkState('is_truck_required')} />
              Truck is required
            </label>
          </div>
          </div>

        <div className="form-group">
          <label>
            When does your donation need to be picked up?
          </label>

          <label className="inline-50-label">
              Between
              {this.renderTimeDropdownFrom()}
          </label>
          <label className="inline-50-label">
            and
            {this.renderTimeDropdownTo()}
          </label>
        </div>

        <div className="form-group">
          <label>
            What food items will you be donating?
            <textarea className="form-control" rows="3" valueLink={this.linkState('description')}
                placeholder="I have 25 pounds of broccoli and 10 pounds of sweet potatoes">
            </textarea>
          </label>
        </div>

        <div className="form-group">
          <label>
            Are there any specific pick up instructions for the driver?
            <textarea className="form-control" rows="3" valueLink={this.linkState('instructions')}
                placeholder="pick up will be easier if driver parks at back entrance">
            </textarea>
          </label>
        </div>

        <button className="btn btn-primary btn-large submit-button">Submit</button>
      </form>

      // <div className="form-group">
        //   Date
        //   <input type="date" className="form-control" />

        //   Time Frame
        //   <label>
        //     From
        //     {this.renderTimeDropdownFrom()}
        //   </label>
        //   <label>
        //     To
        //     {this.renderTimeDropdownTo()}
        //   </label>
      // </div>
    );
  },
  renderTimeDropdownFrom: function() {
    // 30min, 1h, 2h (drop-down)
    // 6:30am-8am
    // Tomorrow morning

    return (
      <select className="form-control" onChange={this.startTimeChanged}>
        {this.renderTimeDropdownFromOpts()}
      </select>
    );
  },
  renderTimeDropdownFromOpts: function() {
    return _.map(times, function(time) {
      return (
        <option value={time.toISOString()} selected={this.state.startTime == time}>{time.format('h:mm A')}</option>
      );
    }, this);
  },
  renderTimeDropdownTo: function() {
    return (
      <select className="form-control" onChange={this.endTimeChanged}>
        {this.renderTimeDropdownToOpts()}
      </select>
    );
  },
  renderTimeDropdownToOpts: function() {
    return _.map(times, function(time) {
      return (
        <option value={time.toISOString()} selected={this.state.endTime == time}>{time.format('h:mm A')}</option>
      );
    }, this);
  },

  startTimeChanged: function(e) {
    this.state.startTime = moment(e.target.value);
    this.setState(this.state);
  },

  endTimeChanged: function(e) {
    this.state.endTime = moment(e.target.value);
    this.setState(this.state);
  },

  formSubmit: function(e) {
    e.preventDefault();
    var transformed = this.state;

    transformed.timeframe_start = this.state.startTime.toISOString();
    transformed.timeframe_end   = this.state.endTime.toISOString();

    this.props.onFormSubmit(transformed);
  }
});

module.exports = DonorForm;
