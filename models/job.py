from common import *
from google.appengine.ext import ndb
from google.appengine.ext.ndb import msgprop

class Job(ndb.Model):
    # Status of the job:
    status = msgprop.EnumProperty(JobStatus, required=True)

    # Provided by donor form:
    donor_id = ndb.KeyProperty(kind="Donor", required=True)
    description = ndb.StringProperty(required=True)
    instructions = ndb.StringProperty(required=True)
    contact_phone = ndb.StringProperty(required=True)
    donor_name = ndb.StringProperty(required=True)
    pickup_location = ndb.StructuredProperty(Address, required=True)
    timeframe_start = ndb.DateTimeProperty(required=True)
    timeframe_end = ndb.DateTimeProperty(required=True)
    is_okay_to_text = ndb.BooleanProperty(required=True)
    should_notify_donor = ndb.BooleanProperty(required=True)
    is_truck_required = ndb.BooleanProperty(required=True)

    # Once drop off location is assigned:
    drop_off_id = ndb.KeyProperty(kind="DropOff", required=False)
    drop_off_name = ndb.StringProperty(required=False)
    drop_off_location = ndb.StructuredProperty(Address, required = False)
    drop_off_phone = ndb.StringProperty(required=False)

    # Once accepted by a driver:
    accepted_by_id = ndb.KeyProperty(kind="Driver", required=False)
    accepted_by_name = ndb.StringProperty(required=False)
    accepted_by_phone = ndb.StringProperty(required=False)

