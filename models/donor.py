from common import *
from google.appengine.ext import ndb

class Donor(ndb.Model):
    name = ndb.StringProperty(required=True)
    address = ndb.StructuredProperty(Address, required=True)
    phone = ndb.StringProperty(required=True)
