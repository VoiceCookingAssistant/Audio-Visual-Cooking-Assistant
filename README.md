# Audio-Visual-Cooking-Assistant

<!-- PROJECT LOGO -->
<!-- <br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</p> -->

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#development">Development</a></li>
    <li><a href="#production">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#ecrommendations">Recommendations</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

TBD

### Built With

Inititally the frontend application is built with svelte and has a node server which serves as a middleware to the Rhasspy instance.

- [Svelte](https://svelte.dev/)
- [Nodejs](https://nodejs.org)
- [Rhasspy](https://rhasspy.readthedocs.io/en/latest/)

## Getting started

---

### Prerequisites

You need to have node and npm installed. To run it on your machine we propose to have docker and docker-compose installed.

<br />

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

<br />

**Start with docker** (_Recommended_):

```bash
docker-compose build
docker-compose up
```

Navigate to [localhost:5000](http://localhost:5000). You see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

<br />

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
You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.&nbsp;
<br />
<br />

---

<br />

### 2. Connect Application with local Rhasspy Environment

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
   <br />
   <br />

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

## Recommendations

---

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information. <br />
Training Dataset(rhasspy/NLU/trainset.md) and Testing Dataset(rhasspy/NLU/testset.md) are provided under a [“CC BY 4.0”](https://creativecommons.org/licenses/by/4.0/).
