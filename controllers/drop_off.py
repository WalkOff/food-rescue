import webapp2
import json
import jinja2
from base_handler import *
from models.drop_off import DropOff
from common.helpers import dict_maker

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Index(BaseHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('drop_off/drop_off_list.html')
        self.response.write(template.render(loggedInUser = self.user() != None, isDriver=self.user_role() == 'driver'))
    def post(self):
        drop_offs = DropOff.all()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(drop_offs))

class CreateEdit(BaseHandler):
    def get(self, drop_off_id):
        template = JINJA_ENVIRONMENT.get_template('drop_off/drop_off_edit.html')
        self.response.write(template.render(loggedInUser = self.user() != None, isDriver=self.user_role() == 'driver'))
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

class GetAll(BaseHandler):
    def get(self):
        drop_offs = DropOff.query().fetch()
        self.response.write(json.dumps([dict_maker(drop_off) for drop_off in drop_offs]))

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/admin/drop_off/all/?',GetAll),
    ('/admin/drop_off/?',Index),
    ('/admin/drop_off/(\S+)/?',CreateEdit),
], config=config, debug=True)
