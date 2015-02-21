import webapp2

class HelloAdmin(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello Admin")

app = webapp2.WSGIApplication([
    ('/admin', HelloAdmin)
], debug=True)

