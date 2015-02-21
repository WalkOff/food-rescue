import webapp2
import json
import jinja2
import os

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(webapp2):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class EndPoint1(webapp2.RequestHandler):
    def get(self):
        self.response.write(json.dumps({'test':['1','two']}))

app = webapp2.WSGIApplication([
    ('/',EndPoint1)
], debug=True)
