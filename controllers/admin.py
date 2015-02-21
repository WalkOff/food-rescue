import webapp2
from seed_data import *

class Seed(webapp2.RequestHandler):
    def get(self):
        # Delete all existing donors:
        ndb.delete_multi(Donor.query().fetch(keys_only=True))
        for donor in donors:
            donor.put()
        self.response.write("Success")

app = webapp2.WSGIApplication([
    ('/admin/seed', Seed)
], debug=True)

