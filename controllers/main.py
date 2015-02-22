from google.appengine.api import users
from models.donor import *
from models.driver import *
from models.admin import *
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

        # User signed in, but not assigned role:
        if user:
            if self.isDonor(user):
                self.session['role'] = 'donor'
                self.redirect('/job/new')
            elif self.isDriver(user):
                self.session['role'] = 'driver'
                self.redirect('/job')
            elif self.isAdmin(user):
                self.session['role'] = 'admin'
                self.redirect('admin/job')
            else:
                self.response.write('Not a valid user. Please <a href="' + users.create_logout_url('/login') + '">logout and try a different account</a>')
                return

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

    def isAdmin(self, user):
        email = user.email().lower()
        admin = Admin.query(Admin.email == email).fetch(1)
        if admin:
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
