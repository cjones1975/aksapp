FROM node:16-alpine AS AksApp
WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

ARG configuration=production
RUN npm run build -- --output-path=/usr/local/app/dist/out --configuration $configuration

FROM nginx:alpine
COPY --from=AksApp /usr/local/app/dist/out /usr/share/nginx/html

EXPOSE 80