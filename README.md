# 🦠 mykro

![Repo status](https://www.repostatus.org/badges/latest/active.svg)
[![Build Status](https://travis-ci.com/andersonbosa/mykro.svg?token=kLjLhr4pnWBb2ZsKxrHz&branch=master)](https://travis-ci.com/andersonbosa/mykro)
[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

This is a [Moleculer](https://moleculer.services/)-based project to manage personal microservices.

## Getting started

- Start the project with `yarn run dev` command. After starting, open the http://localhost:3040/ URL in your browser. On the welcome page you can test the generated services via API Gateway and check the nodes & services.

- In the terminal, try the following commands:
  - `nodes` - List all connected nodes.
  - `actions` - List all registered service actions.
  - `call greeter.hello` - Call the `greeter.hello` action.
  - `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.


<br/>

## Useful links

-   Moleculer website: https://moleculer.services/
-   Moleculer Documentation: https://moleculer.services/docs/0.14/

<br/>

## NPM scripts

-   `yarn run dev`: Start development mode (load all services locally with hot-reload & REPL)
-   `yarn run start`: Start production mode (set `SERVICES` env variable to load certain services)
-   `yarn run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
-   `yarn run lint`: Run ESLint
-   `yarn run ci`: Run continuous test mode with watching
-   `yarn run test`: Run tests & generate coverage report


<br/>

## Deploy

The deploy is made via TravisCI to Heroku

