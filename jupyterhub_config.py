c = get_config()

# Configure Jupyterhub to use the Windows-compatible authenticator
c.JupyterHub.authenticator_class = 'windows_authenticator.WindowsAuthenticator'

# Configure Jupyterhub to use the Windows spawner
c.JupyterHub.spawner_class = 'windows_spawner.WindowsSpawner'

# Set the IP and port for Jupyterhub to listen on
c.JupyterHub.ip = '127.0.0.1'
c.JupyterHub.port = 8000

# Additional settings for running Jupyterhub on Windows
c.Spawner.default_url = '/lab'
c.Spawner.notebook_dir = 'C:\\Users\\{username}\\Documents\\Jupyter'
c.Spawner.args = ['--NotebookApp.default_url=/lab']
