import webapp2
import json
import jinja2
from models.drop_off import DropOff
from common.helpers import str2bool

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views/drop_off"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('drop_off_list.html')
        self.response.write(template.render())
    def post(self):
        drop_offs = DropOff.all()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(drop_offs))

class CreateEdit(webapp2.RequestHandler):
    def get(self, drop_off_id):
        template = JINJA_ENVIRONMENT.get_template('drop_off_edit.html')
        self.response.write(template.render())
    def post(self):
        drop_off_id = self.request.get('drop_offId')
        drop_off = drop_off_id.get()
        drop_off_blob = self.request.get('drop_off')
        try:
            drop_off_vals = json.loads(drop_off_blob)
        except:
            self.response.out.write('Error!')
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(drop_off))

app = webapp2.WSGIApplication([
    ('/drop_off/?',Index),
    ('/drop_off/(\S+)/?',CreateEdit)
], debug=True)