import webapp2
import json
import jinja2
import os

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader("./views"),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class HelloWorld(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello Liu's world!!")

class Index(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

class EndPoint1(webapp2.RequestHandler):
    def get(self):
        self.response.write(json.dumps({'test':['1','two']}))

app = webapp2.WSGIApplication([
    ('/', Index),
    ('/endpoints/',EndPoint1)
], debug=True)
