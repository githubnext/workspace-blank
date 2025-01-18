import os
import subprocess
from jupyterhub.spawner import Spawner
from tornado import gen

class WindowsSpawner(Spawner):
    @gen.coroutine
    def start(self):
        self.user.server.port = self.port
        cmd = self.cmd + self.get_args()
        self.proc = subprocess.Popen(cmd, shell=True)
        return (self.ip or '127.0.0.1', self.port)

    @gen.coroutine
    def stop(self):
        if self.proc:
            self.proc.terminate()
            yield self.proc.wait()

    @gen.coroutine
    def poll(self):
        if self.proc:
            return self.proc.poll()
        return None
