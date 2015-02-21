import webapp2
import json
import jinja2
from models.job import Job
from common.helpers import dict_maker
JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/job"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class List(webapp2.RequestHandler):
    def get(self):
        jobs = Job.query().fetch(10)
        self.response.write(json.dumps([dict_maker(j) for j in jobs]))

app = webapp2.WSGIApplication([
    ('/job/index',Index),
    ('/job/list',List)
], debug=True)