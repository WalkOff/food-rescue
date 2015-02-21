from google.appengine.ext import ndb

class Address(ndb.Model):
    address1 = ndb.StringProperty(required=True)
    address2 = ndb.StringProperty(required=False)
    city = ndb.StringProperty(required=True)
    state = ndb.StringProperty(required=True)
    zipcode = ndb.StringProperty(required=True)
