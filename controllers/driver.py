import webapp2
import json
import jinja2
from base_handler import *
from models.donor import Donor
from models.job import Job
from models.driver import Driver
from common.helpers import str2bool,dict_maker
from models.common import JobStatus
from base_handler import *
from google.appengine.ext import ndb

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/driver"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('driver_list.html')
        self.response.write(template.render())
    def post(self):
        drivers = Driver.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([dict_maker(d) for d in drivers]))

class CreateEdit(BaseHandler):
    def template_for_get(self, role):
        if role == 'donor':
            return 'driver_info.html'
        else:
            return 'driver_edit.html'

    def get(self, driver_id):
        role = self.session['role']
        driver_key = ndb.Key(urlsafe=driver_id)
        driver     = driver_key.get()
        template = JINJA_ENVIRONMENT.get_template(self.template_for_get(role))
        self.response.write(template.render(driver=json.dumps(dict_maker(driver))))

class UpdateStatus(BaseHandler):
    def post(self):
        try:
            driver_id = self.request.get('driverId')
            driver = driver_id.get()
            status_val = self.request.get('status')
            driver.is_active = str2bool(status_val)
            driver.put()
        except:
            self.response.out.write({'success':'false'})
            return
        self.response.out.write({'success':'true'})

class JobView(BaseHandler):
    def get(self, job_id):
        template = JINJA_ENVIRONMENT.get_template('job_view.html')
        user_email = self.user().email()
        driver = Driver.query(Donor.email == user_email).fetch()[0]
        self.response.write(template.render({'job_id':job_id, 'driver_id':driver.key.urlsafe()}))
    def post(self, jobId):
        job_key = ndb.Key(urlsafe=jobId)
        job = job_key.get()
        return self.response.out.write(json.dumps(dict_maker(job)))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/driver/job/(\S+)', JobView),
    ('/driver/?',Index),
    ('/driver/(\S+)/?',CreateEdit)
], config=config, debug=True)
