import webapp2
import json
import jinja2
from datetime import *
from models.job import Job
from models.donor import Donor
from models.common import *
from models.job import Job, Address
from common.helpers import dict_maker
from models.common import JobStatus
from base_handler import *
from google.appengine.ext import ndb

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/job"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

'''
Job listing
'''
class Index(BaseHandler):
    def get(self):
        jobUrlPrefix = "basic"
        print self.user()
        print self.user_role()
        if self.user_role() == 'donor':
            jobUrlPrefix= 'donor'
        if self.user_role() == 'driver':
            jobUrlPrefix = '/driver/job/'
        if self.user_role() == 'admin':
            jobUrlPrefix = '/admin/job/'
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render(jobUrlPrefix=jobUrlPrefix))

    def post(self):
        jobs = Job.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps([dict_maker(j) for j in jobs]))

'''
New job/donation creation form
'''
class New(BaseHandler):
    def get(self):
        if self.user_role() != 'donor':
            self.abort(403)

        template = JINJA_ENVIRONMENT.get_template('new.html')
        self.response.write(template.render())

    def post(self):
        if self.user_role() != 'donor':
            self.abort(403)

        job_json = self.request.get('job')
        job_object = json.loads(job_json)

        pickup_location = Address()
        pickup_location.address1 = job_object['pickup_address1']
        pickup_location.address2 = job_object['pickup_address2']
        pickup_location.city = job_object['pickup_city']
        pickup_location.state = job_object['pickup_state']
        pickup_location.zipcode = job_object['pickup_zipcode']

        job = Job()
        job.status = JobStatus.submitted
        job.donor_id = ndb.Key(urlsafe = job_object['donor_id'])
        job.description = job_object['description']
        job.instructions = job_object['instructions']
        job.contact_phone = job_object['contact_phone']
        job.donor_name = job_object['donor_name']
        job.pickup_location = pickup_location
        job.timeframe_start = datetime.now()
        job.timeframe_end = datetime.now() + timedelta(hours=1)
        job.is_okay_to_text = job_object['is_okay_to_text']
        job.should_notify_donor = job_object['should_notify_donor']
        job.is_truck_required = job_object['is_truck_required']

        job.put()

        return self.response.out.write(json.dumps({'success': True}))

'''
Returns JSON representation of the currently logged-in donor
'''
class CurrentDonor(BaseHandler):
    def get(self):
        if self.user_role() != 'donor':
            self.abort(403)

        donor = Donor.query(Donor.email == self.user().email().lower()).fetch(1)[0]
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(dict_maker(donor)))

'''
Returns job detail view
'''
class Details(BaseHandler):
    def get(self, id):
        template = JINJA_ENVIRONMENT.get_template('job_detail.html')
        self.response.write(template.render(jobId=id))
    def post(self):
        job_id_str = self.request.get('id')
        jobkey = ndb.Key(urlsafe = job_id_str)
        job = jobkey.get()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(dict_maker(job)))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/job/?',Index),
    ('/job/new/?',New),
    ('/job/current_donor/?',CurrentDonor),
    ('/job/(\S+)/?',Details),
], config=config, debug=True)
