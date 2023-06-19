# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:16-alpine as base
LABEL maintainer = "JPS Judicial Payment Frontend <https://github.com/hmcts/jps-judicial-payment-frontend>"

WORKDIR /opt/app

USER root
RUN corepack enable
USER hmcts

FROM base as build

COPY --chown=hmcts:hmcts . ./

RUN yarn
RUN yarn build:ssr

FROM base as runtime

COPY --from=build /opt/app/package.json $WORKDIR/
COPY --from=build /opt/app/dist/ $WORKDIR/dist
COPY --from=build /opt/app/config/ $WORKDIR/config
EXPOSE 4000

CMD [ "node", "/opt/app/dist/jps-judicial-payment-frontend/server/main.js" ]
