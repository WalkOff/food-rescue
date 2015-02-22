import webapp2
import json
from base_handler import *
from datetime import datetime
from models.job import Job
from models.common import *
from models.donor import *
from models.drop_off import *
from seed_data import *
from google.appengine.api import urlfetch
import urllib

class Seed(BaseHandler):
    def get(self):
        # Delete all existing entities:
        ndb.delete_multi(Donor.query().fetch(keys_only=True))
        ndb.delete_multi(DropOff.query().fetch(keys_only=True))
        ndb.delete_multi(Driver.query().fetch(keys_only=True))
        ndb.delete_multi(Admin.query().fetch(keys_only=True))

        for donor in donors:
            donor.put()

        for drop_off in drop_offs:
            drop_off.put()
        
        for driver in drivers:
            driver.put()

        for admin in admins:
            admin.put()

        self.response.write("Success")

class MakeJob(BaseHandler):
    def get(self):
        # Delete all existing entities:
        ndb.delete_multi(Donor.query().fetch(keys_only=True))
        ndb.delete_multi(DropOff.query().fetch(keys_only=True))
        ndb.delete_multi(Driver.query().fetch(keys_only=True))
        ndb.delete_multi(Job.query().fetch(keys_only=True))
        address = Address(address1="123 Street Dr", address2="Floor 2", city="Pittsburgh", state="PA", zipcode="15239")
        donor = Donor(name="Good Will", address=address, phone="3379620553", email="shawn.rancatore@gmail.com")
        donor.put()
        job = Job(donor_id=donor.key, donor_name=donor.name, pickup_location=donor.address, timeframe_start=datetime.now(), is_okay_to_text=True,
                  should_notify_donor=True, is_truck_required=True, contact_phone='123-123-1234', description='Pick up food from catering event',
                  instructions='Do this thing and another thing', timeframe_end=datetime.now(), status=JobStatus.submitted)
        job.put()
        self.response.write('done')

class TextJenny(BaseHandler):
    def get(self):
        drop_off = DropOff.query().fetch(1)[0]
        job = Job.query().fetch(1)[0]

        data = {'jobId':job.key.urlsafe(), 'dropoffId':drop_off.key.urlsafe()}

        result = urlfetch.fetch(
                url='http://localhost:8080/admin/job/assign',
                payload = urllib.urlencode(data),
                method = urlfetch.POST,
                headers={'Content-Type': 'application/x-www-form-urlencoded'})

        self.response.write(result.content)

config = {}
config['webapp2_extras.sessions'] = {'secret_key': 'secret-session-key-123'}

app = webapp2.WSGIApplication([
    ('/admin/seed', Seed),
    ('/admin/make_job', MakeJob),
    ('/admin/text_jenny', TextJenny)
], config=config, debug=True)

