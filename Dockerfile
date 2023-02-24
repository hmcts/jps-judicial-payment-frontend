# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
LABEL maintainer = "HMC Judicial Payment Frontend <https://github.com/hmcts/hmc-judicial-payment-frontend>"

WORKDIR /opt/app

USER root
RUN corepack enable
USER hmcts

COPY --chown=hmcts:hmcts .yarn ./.yarn
COPY --chown=hmcts:hmcts package.json yarn.lock .yarnrc.yml ./

RUN yarn

FROM base as build

COPY --chown=hmcts:hmcts . ./

RUN yarn build:prod

FROM nginx:latest as runtime

COPY --from=build /opt/app/dist/hmc-judicial-payment-frontend/ /usr/share/nginx/html

EXPOSE 80
