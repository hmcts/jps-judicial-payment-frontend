## Startup the Angular service locally

Run `yarn start:ng` to start up the UI.
# Judicial Payment Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jps-judicial-payment-frontend&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jps-judicial-payment-frontend) 
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jps-judicial-payment-frontend&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=jps-judicial-payment-frontend) 
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=jps-judicial-payment-frontend&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=jps-judicial-payment-frontend) 
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jps-judicial-payment-frontend&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=jps-judicial-payment-frontend) 
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jps-judicial-payment-frontend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=jps-judicial-payment-frontend)


## Startup the Node service locally

1. Make sure you have local-development.json within /config, if you do not you can get this from an XUI team member.
2. Start the Node service locally using: 
`export IDAM_SECRET=* && export S2S_SECRET=* && export NODE_CONFIG_DIR=../config && export NODE_CONFIG_ENV=development
&& export ALLOW_CONFIG_MUTATIONS=1 && npm run start:node`

Explanation: 

NODE_CONFIG_DIR tells the machine where the configuration for the Node application is located.
NODE_CONFIG_ENV=development sets the machine so that the config that is used is local-development.json

@see https://github.com/lorenwest/node-config/wiki/Configuration-Files
## Description

An intermediate digital solution which provides the Judicial Payments team with a consistent data set, that enables the payment of sitting hours for Tribunal Judicial Office Holders once that service moves their listing processes away from legacy/heritage tools into reform, and until the strategic solution is available.

## Getting Started

### Prerequisites

Running the application requires the following tools to be installed in your environment:

* [Node.js](https://nodejs.org/) v16.19.0 or later
* [Yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com)

### Running the application

The application will run in production using server-side processing. More info can be found [here](https://angular.io/guide/universal).

Install dependencies by executing the following command:

 ```bash
$ yarn install
 ```
Bundle:

```bash
$ yarn build:ssr
```
Run:

```bash
# Development
$ yarn dev:ssr 
# Production
$ yarn serve:ssr
```

The application's home page will be available at https://localhost:4000

## Developing

### Code style

[ESLint](https://github.com/typescript-eslint/typescript-eslint) is used as the linter for the project.


Running the linter:
```bash
$ yarn lint
```

### Running the tests

This app uses jasmine and karma as the testing framework, more information can be found on the  [Angular testing docs](https://angular.io/guide/testing). 

You can run unit tests by executing
the following command:

```bash
$ yarn test
```

Here's how to run functional tests (to be implemented):

```bash
$ yarn test:functional
```

Running accessibility tests (to be implemented):

```bash
$ yarn test:a11y
```

Make sure all the paths in your application are covered by accessibility tests).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
