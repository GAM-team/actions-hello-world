import os, sys
import platform
from ssl import OPENSSL_VERSION

if os.environ.get('STATICX_PROG_PATH', False):
    execution_type = 'staticx'
elif getattr(sys, 'frozen', False):
    execution_type = 'pyinstaller'
else:
    execution_type = 'pythonsource'

proc = platform.processor()
if not proc:
    proc = platform.machine()

print(f'Python {platform.python_version()} {OPENSSL_VERSION}')
print(f'Execution type: {execution_type}')
print(f'Platform: {platform.platform()}')
print(f'Processor: {proc}')
