FROM ambientum/node:latest

ADD . /var/www/app

RUN cd /var/www/app && \
    yarn install

WORKDIR "/var/www/app"

CMD ["node", "index.js"]