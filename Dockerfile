# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
LABEL maintainer = "HMC Judicial Payment Frontend <https://github.com/hmcts/hmc-judicial-payment-frontend>"

COPY --chown=hmcts:hmcts package.json yarn.lock ./

FROM base as build
RUN yarn
COPY --chown=hmcts:hmcts . .
RUN yarn build:prod && rm -r node_modules/ && rm -r ~/.cache/yarn

FROM base as runtime
COPY --from=build $WORKDIR ./
USER hmcts
EXPOSE 4200
CMD [ "yarn", "start" ]
