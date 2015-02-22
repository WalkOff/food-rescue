from datetime import datetime, date, time
from google.appengine.ext import ndb
from models.common import JobStatus
from models.donor import Donor
from models.driver import Driver
from models.admin import Admin

def str2bool(v):
    return v.lower() in ("yes", "true", "t", "1")

def dict_maker(o):
    out = {}
    for property in vars(o)['_values'].keys():
        value = getattr(o,property)
        if isinstance(value,ndb.Model):
            out[property]= dict_maker(value)
            out['ndb_id'] = o.key.urlsafe()
        elif isinstance(value, ndb.Key):
            out[property] = value.urlsafe()
        elif isinstance(value, (datetime, date, time)):
            out[property] = str(value)
        elif isinstance(value,JobStatus):
            out[property] = str(value)
        else:
            out[property] = value
    return out

def isDonor(user):
    email = user.email().lower()
    donor = Donor.query(Donor.email == email).fetch(1)
    if donor:
        return True
    else:
        return False

def isDriver(user):
    email = user.email().lower()
    driver = Driver.query(Donor.email == email).fetch(1)
    if driver:
        return True
    else:
        return False

def isAdmin(user):
    email = user.email().lower()
    admin = Admin.query(Admin.email == email).fetch(1)
    if admin:
        return True
    else:
       return False
