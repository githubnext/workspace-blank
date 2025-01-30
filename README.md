# Voting App

This is a simple voting application built with Flask. Users can vote for their favorite option and see the results in real-time.

## Features

- Vote for your favorite option
- View real-time voting results

## Setup and Running the App

1. Clone the repository:
   ```
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Create and activate a virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Open your web browser and go to `http://127.0.0.1:5000` to see the app in action.

## Deploying to Azure

1. Install the Azure CLI:
   ```
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

2. Log in to your Azure account:
   ```
   az login
   ```

3. Create a new Azure Web App:
   ```
   az webapp up --name <your-app-name> --resource-group <your-resource-group> --runtime "PYTHON|3.8"
   ```

4. Configure continuous deployment with Azure Pipelines:
   - Create a new pipeline in Azure Pipelines and connect it to your GitHub repository.
   - Use the provided `azure-pipelines.yml` file for the pipeline configuration.

5. Your app should now be deployed and accessible at `https://<your-app-name>.azurewebsites.net`.
