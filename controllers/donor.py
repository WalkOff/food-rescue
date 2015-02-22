import webapp2
import json
import jinja2
import os
from google.appengine.ext import ndb
from base_handler import *
from models.donor import Donor
from common.helpers import dict_maker

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('donor_list.html')
        self.response.write(template.render(loggedInUser = self.user() != None))
    def post(self):
        donors = Donor.query().fetch()
        self.response.headers['Content-Type'] = 'application/json'   
        self.response.out.write(json.dumps([dict_maker(d) for d in donors]))

class CreateEdit(BaseHandler):
    def get(self, donor_id):
        template = JINJA_ENVIRONMENT.get_template('donor_edit.html')
        self.response.write(template.render(loggedInUser = self.user() != None))
    def post(self):
        donor_id = self.request.get('donorId')
        donor = donor_id.get()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(donor))

class Thanks(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('thankyou.html')
        self.response.write(template.render(loggedInUser = self.user() != None))
config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/admin/donor/thanks', Thanks),
    ('/admin/donor/?',Index),
    ('/admin/donor/(\S+)/?',CreateEdit)
], config=config, debug=True)
