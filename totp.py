import hashlib
import os
import time

import pyotp

totp = pyotp.TOTP(os.environ.get('TOTP_SECRET'), digest=hashlib.sha256)
print(totp.now())
