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

from datetime import datetime, date, time

def dict_maker(o):
    out = {}
    for property in vars(o)['_values'].keys():
        value = getattr(o,property)
        if isinstance(value,ndb.Model):
            out[property]= dict_maker(value)
        elif isinstance(value, ndb.Key):
            out[property] = value.urlsafe()
        elif isinstance(value, (datetime, date, time)):
            out[property] = str(value)
        elif isinstance(value,JobStatus):
            out[property] = str(value)
        else:
            out[property] = value
    return out