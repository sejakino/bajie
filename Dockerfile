FROM node:latest

ADD . /web

RUN cd /web && \
    npm install

CMD ["node", "/web/index.js"]