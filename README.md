# Jupyterhub on Windows

This repository contains a Jupyterhub fork that works on Windows without using WSL or Docker. It includes an alternative to PAM and a spawner using native Windows commands.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Configure Jupyterhub:
   - Copy the `jupyterhub_config.py` file to the root of the repository.
   - Edit the configuration file as needed.

4. Run Jupyterhub:
   ```
   jupyterhub
   ```

## Windows-compatible Authenticator

The Windows-compatible authenticator replaces PAM and uses native Windows commands for authentication. It is implemented in the `windows_authenticator.py` file.

## Windows Spawner

The Windows spawner uses native Windows commands to start, stop, and manage user sessions. It is implemented in the `windows_spawner.py` file.
