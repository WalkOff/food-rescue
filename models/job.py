import common
from google.appengine.ext import ndb


class Job(ndb.Model):
    donor_id = ndb.KeyProperty(kind="Donor", required=True)
    description = ndb.StringProperty(required=True)
    instructions = ndb.StringProperty(required=True)
    contact_phone = ndb.StringProperty(required=True)
    donor_name = ndb.StringProperty(required=True)
    donor_address = ndb.StructuredProperty(Address, required=True)
    timeframe_start = ndb.DateTimeProperty(required=True)
    timeframe_end = ndb.DateTimeProperty(required=True)
    is_okay_to_text = ndb.BooleanProperty(required=True)
    should_notify_donor = ndb.BooleanProperty(required=True)
    is_truck_required = ndb.BooleanProperty(required=True)
    is_accepted = ndb.BooleanProperty(required=True)
    accepted_by = ndb.KeyProperty(kind="Driver")
