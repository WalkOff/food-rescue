from google.appengine.api import users
from models.donor import *
from models.driver import *
from base_handler import *
import webapp2
import json
import jinja2
import os

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class Login(BaseHandler):
    def get(self):
        user = users.get_current_user()

        if user:
            if self.isDonor(user):
                role = "donor"
            elif self.isDriver(user):
                role = "driver"
            else:
                self.response.write("Not a valid user")
                return

            self.session['role'] = role
            self.response.write("Signed in with role of: " + role)

        else:
            self.response.redirect(users.create_login_url("/Login"))

    def isDonor(self, user):
        donor = Donor.query(Donor.email == user.email())
        if donor:
            return True
        else:
            return False

    def isDriver(self, user):
        driver = Driver.query(Donor.email == user.email())
        if donor:
            return True
        else:
            return False

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/',Index),
    ('/login', Login)
], config=config, debug=True)
