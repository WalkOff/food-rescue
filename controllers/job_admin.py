import webapp2
from base_handler import *
from datetime import datetime
from models.job import Job
from models.common import *
from models.donor import *
from models.drop_off import *
from seed_data import *

class JobAdmin(BaseHandler):
    def get(self):
        return
    def post(self):
        return

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/admin/job', Seed)
], config=config, debug=True)

