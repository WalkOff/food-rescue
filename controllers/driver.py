import webapp2
import json
import jinja2
from base_handler import *
from models.donor import Donor
from models.job import Job
from models.driver import Driver
from common.helpers import *
from models.common import JobStatus
from base_handler import *
from google.appengine.ext import ndb
from google.appengine.ext.webapp.util import login_required

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('driver/driver_list.html')
        self.response.write(template.render(loggedInUser = self.user() != None))
    def post(self):
        drivers = Driver.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps([dict_maker(d) for d in drivers]))

class CreateEdit(BaseHandler):
    def template_for_get(self, role):
        if role == 'donor':
            return 'driver/driver_info.html'
        else:
            return 'driver/driver_edit.html'

    def get(self, driver_id):
        role       = self.session['role']
        driver_key = ndb.Key(urlsafe=driver_id)
        driver     = driver_key.get()
        print(driver)
        template   = JINJA_ENVIRONMENT.get_template(self.template_for_get(role))
        self.response.write(template.render(driverId=driver.key.urlsafe(), driver=json.dumps(dict_maker(driver)), loggedInUser=self.user() != None))

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
    @login_required
    def get(self, job_id):

        # User signed in via google, but not yet assigned role:
        if not self.user_role():
            user = users.get_current_user()
        
            if isDriver(user):
                self.session['role'] = 'driver'
            elif isDonor(user):
                self.session['role'] = 'donor'
                self.abort(403)
            elif isAdmin(user):
                self.session['role'] = 'admin'
                self.abort(403)
            else:
                self.response.write('Not a valid user. Please <a href="' + users.create_logout_url('/login') + '">logout and try a different account</a>')
                return

        template = JINJA_ENVIRONMENT.get_template('driver/job_view.html')
        user_email = self.user().email()
        driver = Driver.query(Donor.email == user_email).fetch()[0]
        self.response.write(template.render({'job_id':job_id, 'driver_id':driver.key.urlsafe(), 'loggedInUser':self.user() != None}))
    def post(self, jobId):
        job_key = ndb.Key(urlsafe=jobId)
        job = job_key.get()
        return self.response.out.write(json.dumps(dict_maker(job)))

class TakeJob(BaseHandler):
    def post(self, jobId):
        user_email = self.user().email()
        driver = Driver.query(Donor.email == user_email).fetch()[0]
        job_key = ndb.Key(urlsafe=jobId)
        job = job_key.get()
        job.accepted_by_id= driver.key
        job.accepted_by_name =driver.name
        job.accepted_by_phone=driver.phone
        job.put()
        return self.response.out.write(json.dumps({'success': True}))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/driver/take/job/(\S+)', TakeJob),
    ('/driver/job/(\S+)', JobView),
    ('/driver/status?',UpdateStatus),
    ('/driver/?',Index),
    ('/driver/(\S+)/?',CreateEdit),
], config=config, debug=True)
