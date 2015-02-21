import webapp2

class HelloWorld(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello Nathan's World!")

app = webapp2.WSGIApplication([
    ('/', HelloWorld)
], debug=True)

