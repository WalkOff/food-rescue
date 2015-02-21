import webapp2
import json
import jinja2
import os
from google.appengine.ext import ndb
from models.donor import Donor

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('donor_list.html')
        self.response.write(template.render())
    def post(self):
        donors = Donor.all()
        self.response.headers['Content-Type'] = 'application/json'   
        self.response.out.write(json.dumps(donors))

app = webapp2.WSGIApplication([
    ('/donor/',Index)
], debug=True)
