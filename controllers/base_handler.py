import webapp2
from google.appengine.api import users
from webapp2_extras import sessions

class BaseHandler(webapp2.RequestHandler):
    def dispatch(self):
        # Get a session store for this request.
        self.session_store = sessions.get_store(request=self.request)

        try:
            # Dispatch the request.
            webapp2.RequestHandler.dispatch(self)
        finally:
            # Save all sessions.
            self.session_store.save_sessions(self.response)

    @webapp2.cached_property
    def session(self):
        # Returns a session using the default cookie key.
        return self.session_store.get_session()

    def user(self):
        user = users.get_current_user()

        if user and 'role' in self.session:
            return user
        return None

    def user_role(self):
        user = users.get_current_user()

        if user and 'role' in self.session:
            return session['role']
        return None
        
