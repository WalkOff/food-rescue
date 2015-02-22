import webapp2
import json
import jinja2
from models.job import Job
from models.donor import Donor
from common.helpers import dict_maker
from base_handler import *

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/job"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

'''
Job listing
'''
class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

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
            self.response.write('Sorry, only registered donors can view this page')
            return

        template = JINJA_ENVIRONMENT.get_template('new.html')
        self.response.write(template.render())

    def post(self):
        job_json = self.request.get('job')
        job_object = json.loads(job_json)

        pickup_location = Address()
        pickup_location.address1 = job_object.pickup_address1
        pickup_location.address2 = job_object.pickup_address2
        pickup_location.city = job_object.pickup_city
        pickup_location.state = job_object.pickup_state
        pickup_location.zipcode = job_object.pickup_zipcode

        drop_off_location = Address()
        drop_off_location.address1 = job_object.drop_off_address1
        drop_off_location.address2 = job_object.drop_off_address2
        drop_off_location.city = job_object.drop_off_city
        drop_off_location.state = job_object.drop_off_state
        drop_off_location.zipcode = job_object.drop_off_zipcode

        job = Job()
        job.status = JobStatus.submitted
        job.donor_id = ndb.Key(urlsafe = job_object.donor_id)
        job.description = job_object.description
        job.instructions = job_object.instructions
        job.contact_phone = job_object.contact_phone
        job.donor_name = job_object.donor_name
        job.pickup_location = pickup_location
#        job.timeframe_start = job_object.
#        job.timeframe_end = job_object.
        job.is_okay_to_text = job_object.is_okay_to_text
        job.should_notify_driver = job_object.should_notify_driver
        job.is_truck_required = job_object.is_truck_required

        job.put()

class CurrentDonor(BaseHandler):
    def get(self):
        if self.user_role() != 'donor':
            self.response.write('Error: not logged in as a donor')
            return

        donor = Donor.query(Donor.email == self.user().email().lower()).fetch(1)[0]
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(dict_maker(donor)))


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
