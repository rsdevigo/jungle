FROM node:wheezy

MAINTAINER mike@mikangali.com

WORKDIR /app

# Install meanjs tools
RUN npm install -g grunt-cli
RUN npm install -g bower

# Get mean quick start app 
RUN git clone https://github.com/rsdevigo/jungle.git .

# ADD package.json /app
# ADD .bowerrc /app

# Install Mean.JS packages
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
RUN bower install --config.interactive=false --allow-root

# currently only works for development
ENV NODE_ENV development
ENV KONGURL http://localhost:8001

RUN echo "'use strict'; angular.module('core').constant('KONGURL', ['$KONGURL']);" > modules/core/config/core.client.constants.js

RUN cat modules/core/config/core.client.constants.js

# Expose ports: server (3000), livereload (35729)
EXPOSE 3000 35729
CMD ["grunt", "serve"]
