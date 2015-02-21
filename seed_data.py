from models.donor import *
from models.common import *

donors = [
        Donor(name = "Whole Foods", phone="4124417960", address = Address(address1="5880 Centre Ave", city="Pittsburgh", state="PA", zipcode="15206")),
        Donor(name = "Big Burrito Catering", phone="4123613272", address = Address(address1="5740 Baum Blvd", address2 = "#2", city="Pittsburgh", state="PA", zipcode="15206")),
        Donor(name = "McGinnis Sisters", phone="7247791212", address = Address(address1="700 Adams Shoppes", city="Mars", state="PA", zipcode="16046")),
        Donor(name = "Costco - Waterfront Location", phone="4122051002", address = Address(address1="501 W Waterfront Dr", city="West Homestead", state="PA", zipcode="15120")),
        Donor(name = "East End Food Co-op", phone="4122423598", address = Address(address1="7516 Meade St", city="Pittsburgh", state="PA", zipcode="15208")),
]
