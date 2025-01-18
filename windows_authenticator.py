import subprocess
import win32security
import pywintypes
from jupyterhub.auth import Authenticator
from tornado import gen

class WindowsAuthenticator(Authenticator):
    @gen.coroutine
    def authenticate(self, handler, data):
        username = data['username']
        password = data['password']
        
        try:
            token = win32security.LogonUser(
                username,
                None,
                password,
                win32security.LOGON32_LOGON_INTERACTIVE,
                win32security.LOGON32_PROVIDER_DEFAULT
            )
            token.Close()
            return username
        except pywintypes.error:
            return None
