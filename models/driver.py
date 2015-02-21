from google.appengine.ext import ndb

class Driver(ndb.Model):
    name = ndb.StringProperty(required=True)
    phone = ndb.StringProperty(required=True)
    email = ndb.StringProperty(required=True)
    is_active = ndb.BooleanProperty(required=False)
