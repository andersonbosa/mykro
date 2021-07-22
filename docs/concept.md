# Conceptualization of the project

What you have to solve, what you do, what it is, for what it serves.
  - R: To have multiple independent services that can share resources and reuse solutions.

## First services

### :outbox_tray: [API](https://github.com/andersonbosa/mykro/blob/master/src/services/api/api.service.js)

This is the API Gateway service which connects each service to its endpoint.

<br/>

### :wrench: [Mocks](https://github.com/andersonbosa/mykro/blob/master/src/services/mocks/mocks.service.js)

This service is only responsabile to let some mock data be available on a give endpoint, so I can consume it on others side projects.

<br/>

### :crystal_ball: [Habitica](https://github.com/andersonbosa/mykro/blob/master/src/services/habitica/habitica.service.js)

This one is to send a chat message to my Habitica's Party whenever I've leveled up and when there's a new quest invite, so my party fellows can accept it as soon as possible.
