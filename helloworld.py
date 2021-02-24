print('Hello World!')

if platform.system() == 'Windows':
    # No crypt module on Win, use passlib
    from passlib.hash import sha512_crypt
else:
    from crypt import crypt

password = '#hashme123'
if platform.system() == 'Windows':
    hashpass = sha512_crypt.hash(password, rounds=5000)
else:
    hashpass = crypt(password)
print(hashpass)
