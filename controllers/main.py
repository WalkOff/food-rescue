import webapp2
import json
class HelloWorld(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello Liu's world!!")

class EndPoint1(webapp2.RequestHandler):
    def get(self):
        self.response.write(json.dumps({'test':['1','two']}))

app = webapp2.WSGIApplication([
    ('/', HelloWorld)
], debug=True)

endpoints = webapp2.WSGIApplication([('/endpoints/',EndPoint1)], debug=True)

