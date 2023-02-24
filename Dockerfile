# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
LABEL maintainer = "HMC Judicial Payment Frontend <https://github.com/hmcts/hmc-judicial-payment-frontend>"

USER root
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./

FROM base as build
RUN yarn
COPY --chown=hmcts:hmcts . .
RUN yarn build:prod && rm -r node_modules/ && yarn cache clean

FROM base as runtime
COPY --from=build $WORKDIR ./
USER hmcts
EXPOSE 4200
CMD [ "yarn", "start" ]
