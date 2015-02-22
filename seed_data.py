from models.common import *
from models.donor import *
from models.driver import *
from models.drop_off import *
from models.job import *

donors = [
    Donor(name = "Whole Foods", phone="4044466348", email="nathanjcochran@gmail.com", address = Address(address1="5880 Centre Ave", city="Pittsburgh", state="PA", zipcode="15206")),
    Donor(name = "Big Burrito Catering", phone="4044466348", email="jenny@niche.com", address = Address(address1="5740 Baum Blvd", address2 = "#2", city="Pittsburgh", state="PA", zipcode="15206")),
    Donor(name = "McGinnis Sisters", phone="4044466348", email="shawn.rancatore@gmail.com", address = Address(address1="700 Adams Shoppes", city="Mars", state="PA", zipcode="16046")),
    Donor(name = "Costco - Waterfront Location", phone="4044466348", email="jessieschalles@gmail.com", address = Address(address1="501 W Waterfront Dr", city="West Homestead", state="PA", zipcode="15120")),
    Donor(name = "East End Food Co-op", phone="4044466348", email="donor@gmail.com", address = Address(address1="7516 Meade St", city="Pittsburgh", state="PA", zipcode="15208")),
]

drop_offs = [
    DropOff(name="Free Store", phone="8104449621", email="dropoff@gmail.com", address=Address(address1="400 Braddock Ave", city="Braddock", state="PA", zipcode="15104")),
    DropOff(name="Community Kitchen Pittsburgh", email="dropoff@gmail.com", phone="8104449621", address=Address(address1="1323 Forbes Ave", city="Pittsburgh", state="PA", zipcode="15101")),
    DropOff(name="McKeesport School District", email="dropoff@gmail.com", phone="8104449621", address=Address(address1="3590 O'Neil Blvd", city="McKeesport", state="PA", zipcode="15132")),
    DropOff(name="Bethlehem Haven", phone="8104449621", email="dropoff@gmail.com", address=Address(address1="1410 Fifth Ave", city="Pittsburgh", state="PA", zipcode="15219")),
]

drivers = [
    Driver(name="Geoff Misek", phone="8104449621", email="gmisek@gmail.com", is_active=True),
    Driver(name="Nathan Cochran", phone="7175800419", email="cochran@niche.com", is_active=True),
]
