FROM node:8.5.0

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/doemais/

RUN chown -R app:app $HOME/*

USER app

WORKDIR $HOME/doemais

RUN npm i --silent --progress=false

USER root

COPY . $HOME/doemais

RUN chown -R app:app $HOME/*

USER root

CMD ["npm", "serve"]
