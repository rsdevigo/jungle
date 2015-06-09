FROM node:wheezy

MAINTAINER mike@mikangali.com

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/debian "$(lsb_release -sc)"/mongodb-org/3.0 main" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list

RUN apt-get update
RUN apt-get install -y mongodb-org
RUN service mongod start

WORKDIR /app

# Install meanjs tools
RUN npm install -g grunt-cli
RUN npm install -g bower
RUN npm install -g yo
RUN npm install -g generator-meanjs

# Get mean quick start app 
RUN git clone https://github.com/rsdevigo/kongui.git .

# ADD package.json /app
# ADD .bowerrc /app

# Install Mean.JS packages
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
RUN bower install --config.interactive=false --allow-root

# currently only works for development
ENV NODE_ENV development

# Expose ports: server (3000), livereload (35729)
EXPOSE 3000 35729
CMD ["grunt"]