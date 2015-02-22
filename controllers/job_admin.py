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
JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/admin"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class JobList(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('job_list.html')
        self.response.write(template.render())
    def post(self):
        jobs = Job.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps([dict_maker(j) for j in jobs]))

class JobDetails(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('job_view.html')
        self.response.write(template.render())
    def post(self):
        job_id = ndb.Key(self.request.get('jobId'))
        job = job_id.get()

class AssignDropOff(BaseHandler):
    def post(self):
        job_id = ndb.Key(self.request.get('jobId'))
        job = job_id.get()
        drop_off_id = ndb.Key(self.request.get('dropoffId'))
        drop_off = DropOff()
        drop_off = drop_off_id.get()
        job.drop_off_location = drop_off.address
        job.drop_off_name = drop_off.name
        job.drop_off_id = drop_off.key
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(job))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/admin/job/?', JobList),
    ('/admin/job/(\S+)/?', JobDetails),
    ('/admin/job/assign', AssignDropOff)
], config=config, debug=True)

