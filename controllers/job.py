import webapp2
import json
import jinja2
from models.job import Job
from common.helpers import dict_maker
JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/job"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class List(BaseHandler):
    def get(self):
        jobs = Job.query().fetch(10)
        self.response.write(json.dumps([dict_maker(j) for j in jobs]))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/job/index',Index),
    ('/job/list',List)
], config=config, debug=True)
