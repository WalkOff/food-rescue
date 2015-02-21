import webapp2
import json
import jinja2
from models.job import Job
from common.helpers import dict_maker
from base_handler import *

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/job"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class New(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('new.html')
        self.response.write(template.render())


class List(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('job_list.html')
        self.response.write(template.render())
    def post(self):
        jobs = Job.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps([dict_maker(j) for j in jobs]))

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
    ('/job/',Index),
    ('/job/new',New),
    ('/job/(\S+)/?',Details),
    ('/job/list/?',List)
], config=config, debug=True)
