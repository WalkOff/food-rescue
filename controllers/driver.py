import webapp2
import json
import jinja2
from models.driver import Driver
from common.helpers import str2bool

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/driver"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('driver_list.html')
        self.response.write(template.render())
    def post(self):
        drivers = Driver.all()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(drivers))

class CreateEdit(webapp2.RequestHandler):
    def get(self, driver_id):
        template = JINJA_ENVIRONMENT.get_template('driver_edit.html')
        self.response.write(template.render())
    def post(self):
        driver_id = self.request.get('driverId')
        driver = driver_id.get()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(driver))

class UpdateStatus(webapp2.RequestHandler):
    def post(self):
        try:
            driver_id = self.request.get('driverId')
            driver = driver_id.get()
            status_val = self.request.get('status')
            driver.is_active = str2bool(status_val)
            driver.put()
        except:
            self.response.out.write({'success':'false'})
            return
        self.response.out.write({'success':'true'})

app = webapp2.WSGIApplication([
    ('/driver/?',Index),
    ('/driver/(\S+)/?',CreateEdit)
], debug=True)
