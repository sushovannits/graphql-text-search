# graphql-text-search

A graphql server for providing text search capability
<!-- toc -->
- [Overview](#overview)
- [System Requirements](#system-requirements)
- [How To Use](#how-to-use)
- [Snapshots](#snapshots)
- [Implementation Details](#implementation-details)
<!-- tocstop -->

## Overview
This is implementation of a graphql + apollo powered server to provide subtextsearch capabilities. 

## System Requirements
- node
- yarn/ npm

## How To Use
- `yarn install`
- `docker-compose up`
- `yarn start`
- Call the endpoint to get a text to search:
  ```
  var request = require("request");

  var options = {
    method: 'POST',
    url: 'http://localhost:4000/',
    headers: {'content-type': 'application/json'},
    body: '{"query":"{textToSearch}"}'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
  ```
- Search for subtext in given text:
  ```
  var request = require("request");

  var options = {
    method: 'POST',
    url: 'http://localhost:4000/',
    headers: {'content-type': 'application/json'},
    body: '{"query":"{\n  search(searchInput: {textToSearch: \"some text\", subtextToSearch: {subtexts: [\"so\", \"te\"]}}) {\n    text\n    results {\n      subtext\n      result\n    }\n  }\n}\n"}'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  ```
- Submit result (mutation):
  ```
  var request = require("request");

  var options = {
    method: 'POST',
    url: 'http://localhost:4000/',
    headers: {'content-type': 'application/json'},
    body: '{"query":"mutation {submitResults(results: {\n  candidate: \"sush\"\n  text: \"some text\"\n  results: [\n        {\n          subtext: \"so\",\n          result: \"0\"\n        },\n        {\n          subtext: \"te\",\n          result: \"5\"\n        }\n  ]\n})}"}'
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
  ```

## Implementation Details
- Have used apollo with graphql
- A postgres db capability is there but not used at this moment
- This is just the server code. For frontend/client code would use apollo-client with apollo-links for handling retries, etc.
