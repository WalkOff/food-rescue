from protorpc import messages
from google.appengine.ext import ndb

class Address(ndb.Model):
    address1 = ndb.StringProperty(required=True)
    address2 = ndb.StringProperty(required=False)
    city = ndb.StringProperty(required=True)
    state = ndb.StringProperty(required=True)
    zipcode = ndb.StringProperty(required=True)

class JobStatus(messages.Enum):
    submitted = 1   # Submitted by donor
    pending = 2     # Pending driver acceptance
    accepted = 3    # Accepted by a driver
    completed = 4   # Job completed
