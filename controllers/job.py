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
        template = JINJA_ENVIRONMENT.get_template('new.html')
        self.response.write(template.render())

    def post(self):


config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/job/',Index),
    ('/job/new',New),
    ('/job/list/?',List)
], config=config, debug=True)
