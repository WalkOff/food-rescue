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

        # User fully signed in:
        if user and 'role' in self.session:
            self.response.write('Aleady signed in.  Email: ' + user.email() + ' Role: ' + self.session['role'])

        # User signed in, but not assigned role:
        elif user:
            if self.isDonor(user):
                role = 'donor'
            elif self.isDriver(user):
                role = 'driver'
            else:
                self.response.write('Not a valid user. Go to <a href="' + users.create_logout_url('/login') + '">Logout</a> to logout and try a different account')
                return

            self.session['role'] = role
            self.response.write("Signed in with role of: " + role)

        # User not logged in, redirect to google account login page (with return url of this method):
        else:
            self.redirect(users.create_login_url('/login'))

    def isDonor(self, user):
        email = user.email().lower()
        donor = Donor.query(Donor.email == email).fetch(1)
        if donor:
            return True
        else:
            return False

    def isDriver(self, user):
        email = user.email().lower()
        driver = Driver.query(Donor.email == email).fetch(1)
        if driver:
            return True
        else:
            return False

class Logout(BaseHandler):
    def get(self):
        user = users.get_current_user()
        self.session.clear()
        self.redirect(users.create_logout_url('/'))
        
config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/',Index),
    ('/login', Login),
    ('/logout', Logout),
], config=config, debug=True)
