## Startup the Node service locally

1. Make sure you have local-development.json within /config, if you do not you can get this from an XUI team member.
2. Start the Node service locally using: 
`export IDAM_SECRET=* && export S2S_SECRET=* && export NODE_CONFIG_DIR=../config && export NODE_CONFIG_ENV=development
&& export ALLOW_CONFIG_MUTATIONS=1 && npm run start:node`

Explanation: 

NODE_CONFIG_DIR tells the machine where the configuration for the Node application is located.
NODE_CONFIG_ENV=development sets the machine so that the config that is used is local-development.json

@see https://github.com/lorenwest/node-config/wiki/Configuration-Files

## Startup the Angular service locally

Run `yarn start:ng` to start up the UI.