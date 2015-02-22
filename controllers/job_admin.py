import webapp2
from base_handler import *
from datetime import datetime
from models.job import Job
from models.common import *
from models.donor import *
from models.drop_off import *
import json
import jinja2
from common.helpers import dict_maker
from seed_data import *
from twilio.rest import TwilioRestClient

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class JobList(BaseHandler):
    def get(self):
        if self.user_role() != 'admin':
            self.abort(403)
        template = JINJA_ENVIRONMENT.get_template('admin/job_list.html')
        self.response.write(template.render(jobUrlPrefix='job/',loggedInUser = self.user() != None, isDriver=self.user_role() == 'driver'))
    def post(self):
        if self.user_role() != 'admin':
            self.abort(403)

        jobs = Job.query().order(Job.status).fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps([dict_maker(j) for j in jobs]))

class JobDetails(BaseHandler):
    def get(self,job_id):
        if self.user_role() != 'admin':
            self.abort(403)
        drop_offs = DropOff.query().fetch()
        drop_off_json= json.dumps([dict_maker(drop_off) for drop_off in drop_offs])
        template = JINJA_ENVIRONMENT.get_template('admin/job_view.html')
        self.response.write(template.render(jobId=job_id,drop_off_json=drop_off_json,loggedInUser=self.user() != None, isDriver=self.user_role() == 'driver'))
    def post(self,job_id):
        if self.user_role() != 'admin':
            self.abort(403)
        job_key = ndb.Key(urlsafe=job_id)
        job = job_key.get()
        self.response.write(json.dumps(dict_maker(job)))

class AssignDropOff(BaseHandler):
    def post(self):
 #       if self.user_role() != 'admin':
 #           self.abort(403)

        job_id = ndb.Key(urlsafe=self.request.get('jobId'))
        drop_off_id = ndb.Key(urlsafe=self.request.get('dropOffId'))
        job = job_id.get()
        drop_off = drop_off_id.get()
        job.drop_off_location = drop_off.address
        job.drop_off_name = drop_off.name
        job.drop_off_id = drop_off.key
        job.status = JobStatus.pending
        job.put()

        # TWILIO
        ACCOUNT_SID = "ACd8d7d3408818d4457f0936cce8229810" 
        AUTH_TOKEN = "77a8794db8e422eff47bb037f21ee9f1"  
        client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN) 

        active_drivers = Driver.query(Driver.is_active == True).fetch()
        for driver in active_drivers:
            if driver.phone = '7175800419':
                client.messages.create(
                    to=driver.phone,
                    from_="+14124263647",
                    body="Alert: New pickup request from 412 Food Rescue. http://food-rescue.appspot.com/driver/job/" + job.key.urlsafe())
        # /TWILIO

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(dict_maker(job)))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/admin/job/assign/?', AssignDropOff),
    ('/admin/job/(\S+)/?', JobDetails),    
    ('/admin/job/?', JobList),
], config=config, debug=True)

