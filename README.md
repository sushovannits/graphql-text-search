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
This is implementation of a graphql + apollo powered server to provide subtextsearch capabilities. The text and subtext to search is provided from two rest endpoints. 

## System Requirements
- node
- yarn/ npm

## How To Use
- `yarn install`
- `docker-compose up`
- `yarn start`
- Search for subtexts in a text:
  ```
  var request = require("request");

  var options = {
    method: 'POST',
    url: 'http://localhost:4000/',
    headers: {'content-type': 'application/json'},
    body: '{"query":"{\n  searchResult {\n    text {text}\n    subtext {subtexts}\n    results {\n      subtext\n      result\n    }\n  }\n}\n"}'
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
- Right now as API providers I am using these mock endpoints:
  - "https://run.mocky.io/v3/a0bebe23-7351-4ee8-a483-07db484de2f9" -> Provides the text
  - "https://run.mocky.io/v3/068e3ffc-6a54-4dfa-8ada-4d2370d2f6c0" -> Provides the subtext to search
  
  This is in file `SubTextSearchService.ts`
- I will try to see if I can come up with a mock server which fails randomly or a specific percentage of time. But the logic is already there for handling retry in case of failures. 
    

