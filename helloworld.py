import os
from platform import python_version
from ssl import SSL_VERSION

if os.environ.get('STATICX_PROG_PATH', False):
    execution_type = 'staticx'
elif getattr(sys, 'frozen', False):
    execution_type = 'pyinstaller'
else:
    execution_type 'pythonsource'

print(f'Python {python_version()} {OPENSSL_VERSION}')
print(f'Execution type: {execution_type}')
