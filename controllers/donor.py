import webapp2
import json
import jinja2
import os
from google.appengine.ext import ndb
from models.donor import Donor
from common.helpers import dict_maker

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('donor_list.html')
        self.response.write(template.render())
    def post(self):
        donors = Donor.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'   
        self.response.out.write(json.dumps(dict_maker(donors)))

class CreateEdit(webapp2.RequestHandler):
    def get(self, donor_id):
        template = JINJA_ENVIRONMENT.get_template('donor_edit.html')
        self.response.write(template.render())
    def post(self):
        donor_id = self.request.get('donorId')
        donor = donor_id.get()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(donor))

app = webapp2.WSGIApplication([
    ('/donor/?',Index),
    ('/donor/(\S+)/?',CreateEdit)
], debug=True)
