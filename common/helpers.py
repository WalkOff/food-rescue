from datetime import datetime, date, time
from google.appengine.ext import ndb
from models.common import JobStatus

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
