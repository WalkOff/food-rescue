import webapp2
import json
import jinja2
from models.driver import Driver

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

app = webapp2.WSGIApplication([
    ('/driver/?',Index),
    ('/driver/(\S+)/?',CreateEdit)
], debug=True)
