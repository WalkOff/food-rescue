import webapp2

class HelloWorld(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello Liu's world!!")

app = webapp2.WSGIApplication([
    ('/', HelloWorld)
], debug=True)

