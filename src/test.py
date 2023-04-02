import google.auth
import google.auth.transport.requests
import requests
from google.auth.transport.requests import AuthorizedSession

creds, project_id = google.auth.default(scopes='https://www.googleapis.com/auth/iam')
request = google.auth.transport.requests.Request()
creds.refresh(request)
authed_session = AuthorizedSession(creds)

resp = authed_session.get('https://oauth2.googleapis.com/tokeninfo')
print(resp.json())
