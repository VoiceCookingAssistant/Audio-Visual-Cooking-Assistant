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
    <li><a href="#production">Production</a></li>
    <li><a href="#data">Data for Spoken Language Understanding</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#ecrommendations">Recommendations</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This prototype visualizes an example of a fully implemented interface within a multi-function food processor.It is based on the user-flow shown in the following figure.

<p align="center">
  <img src="https://ik.imagekit.io/CookingAssistant/user_flow3_TcIC5VLlfnZ.png" alt="User flow" width="500" />
</p>

Although our prototype does not cover all functions that a real multi-function food processor can offer, it provides a generic solution to research examples for multimodal interaction throughvoice & touch interaction.

The prototype is adaptable to different insights and recommendations, allowing for further research. The software architecture is seen in the following figure.

<p align="center">
  <img src="https://ik.imagekit.io/CookingAssistant/prototype_architecture_G_w9xClfb.png" alt="Architecture" width="500" />
</p>

This prototype is meant to run locally or on a server like AWS. To run it locally please refer to the section <a href="#development">Development</a>.

_Disclaimer:_
If you use the code or dataset please cite our work:

> VoiceCookingAssistant. 2021. Audio-Visual-Cooking-Assistant. https://github.com/VoiceCookingAssistant/Audio-Visual-Cooking-Assistant

### Built With

Inititally the frontend application is built with svelte and has a node server which serves as a middleware to the Rhasspy instance.

- [Svelte](https://svelte.dev/)
- [Nodejs](https://nodejs.org)
- [Rhasspy](https://rhasspy.readthedocs.io/en/latest/)

## Getting started

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

### 2. Connect Application with local Rhasspy Environment

To run a local Rhasspy Envrionemnt you need to have docker and docker-compose installed.

```bash
cd rhasspy
docker-compose up
```

Navigate to [localhost:12101/](http://localhost:12101). You see the environment running&nbsp;

The first time you have to adjust the Rhasspy settings in the UI environment:

1. Click the Home Button
2. Go to Advanced
3. Copy the file rhasspy/profile.json from this repo in it and click "Save Profile".
4. Click on the "Sentences-Menu-Icon" in the left Menu Bar
5. Copy the file rhasspy/template.ini from this repo in it and click "Save Sentences"
   > Dataset in the file rhasspy/template.ini is provided under a [“CC BY 4.0”](https://creativecommons.org/licenses/by/4.0/).
6. Click "Okay" in the Retrain Rhasspy Alert

Now you can test the prototype. For further adaption of the Rhasspy environment please refer to the official doumentation of <a href="https://rhasspy.readthedocs.io/en/latest/">Rhasspy</a>.
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

## Dataset for Spoken Language Understanding

You can apply our large amounts of in-domain dataset for your spoken language understanding research.

- Training Dataset (1964 queries with 10724 running words): rhasspy/NLU/trainset.md
- Test Dataset (839 queries with 4507 running words): rhasspy/NLU/testset.md

> Training Dataset and Testing Dataset are provided under a [“CC BY 4.0”](https://creativecommons.org/licenses/by/4.0/).

## Recommendations

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

This prototype was tested in the Browser <a href="https://www.google.com/chrome/"> Google Chrome </a>.

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information. <br />
