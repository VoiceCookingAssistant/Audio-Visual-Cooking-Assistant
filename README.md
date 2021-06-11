# Audio-Visual-Cooking-Assistant

### Built With

Inititally the frontend application is built with svelte and has a node server which serves as a middleware to the Rhasspy instance.

- [Svelte](https://svelte.dev/)
- [Nodejs](https://nodejs.org)
- [Rhasspy](https://rhasspy.readthedocs.io/en/latest/)

## Getting started

### Prerequisites

You need to have node and npm installed. To run it on your machine we propose to have docker and docker-compose installed.

### Development

### 1. Start the Application:

Install the dependencies...

```bash
#from root
cd frontend
npm install

#from root
cd server
npm install
```

**Start without docker** (Not recommended):

```bash
#from root
cd frontend
npm run dev

#from root
cd server
npm run start-dev
```

Navigate to [localhost:5000](http://localhost:5000).
You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

**Start with docker** (:_Recommended_)

```bash
docker-compose build
docker-compose up
```

Navigate to [localhost:5000](http://localhost:5000). You see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Connect Application with local Rhasspy Environment

To run a local Rhasspy Envrionemnt you need to have docker and docker-compose installed.

```bash
cd rhasspy
docker-compose up
```

Navigate to [localhost:12101/](http://localhost:12101). You see the environment running&nbsp;

The first time you have to adjust the Rhasspy settings in the environemnt:

1. Click the Home Button
2. Go to Advanced
3. Copy the file rhasspy/profile.json from this repo in it and click "Save Profile".
4. Click on the "Sentences-Menu-Icon" in the left Menu Bar
5. Copy the file rhasspy/template.ini from this repo in it and click "Save Sentences"
6. Click "Okay" in the Retrain Rhasspy Alert

## Recommendations

---

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Production

To create an optimised version of the app:

```bash
    docker-compose -f docker-compose.yml build
    docker-compose -f docker-compose.yml up
```

This version expects an .env file in root directory with follwing content:

```bash
    #.env
    PORT=3000
    HOST=0.0.0.0
    MQTTHOST=<YOUR_RHASSPY_HOST_IP>
    RHASSPY_PORT=12183
```

Navigate to [localhost:5000](http://localhost:5000). You see your app running.
