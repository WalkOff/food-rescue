import webapp2
import json
import jinja2
from base_handler import *
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
    def get(self, driver_id):
        template = JINJA_ENVIRONMENT.get_template('driver_edit.html')
        self.response.write(template.render())
    def post(self):
        driver_id = self.request.get('driverId')
        driver = driver_id.get()
        driver_blob = self.request.get('driver')
        try:
            driver_vals = json.loads(driver_blob)
        except:
            self.response.out.write('Error!')
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(driver))

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
        driver = Driver.query(email=user_email)
        print driver.name
        self.response.write(template.render({'job_id':job_id, 'driver_id':driver.key.urlsafe()}))
    def post(self):
        job_key = ndb.Key(self.request.get('jobId'))
        job = job_key.get()
        return json.dumps(dict_maker(job))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/driver/?',Index),
    ('/driver/(\S+)/?',CreateEdit),
    ('/driver/job/(\S+)', JobView)
], config=config, debug=True)
