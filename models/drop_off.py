from google.appengine.ext import ndb
from common import Address

class DropOff(ndb.Model):
    name = ndb.StringProperty(required=True)
    phone = ndb.StringProperty(required=True)
    address = ndb.StructuredProperty(Address, required=True)
    email = ndb.StringProperty(required=True)
