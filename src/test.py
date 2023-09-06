import json
import google.auth
import google.auth.transport.requests
import requests
from google.auth.transport.requests import AuthorizedSession

creds, project_id = google.auth.default(scopes='https://www.googleapis.com/auth/cloud-platform')
request = google.auth.transport.requests.Request()
creds.refresh(request)
authed_session = AuthorizedSession(creds)

resp = authed_session.get('https://oauth2.googleapis.com/tokeninfo')
print('About my Google access:')
print(json.dumps(resp.json(), indent=2))

resp2 = authed_session.get('https://cloudresourcemanager.googleapis.com/v3/projects')
print('Projects I can see:')
print(json.dumps(resp2.json(), indent=2))
