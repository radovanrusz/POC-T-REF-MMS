FROM docker.io/library/centos:7

RUN yum install -y  epel-release

#https://tech.amikelive.com/node-663/quick-tip-installing-nodejs-8-on-centos-7/
#RUN yum install curl
#RUN yum remove -y nodejs npm
#RUN /usr/bin/curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN /usr/bin/curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs

#RUN yum install -y   npm python2 node-gyp gcc make unixODBC
RUN yum install -y python2 node-gyp gcc make unixODBC

RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm i  && ln -s /app/node_modules/ /node_modules

ENV PORT 80
EXPOSE 80

CMD ["node", "src/server/server.js"]
#CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"


#FROM node:8.9-alpine
#RUN mkdir -p /app
#WORKDIR /app
##RUN npm install -g nodemon
#RUN npm config set registry https://registry.npmjs.org
#COPY package.json /app/package.json
##RUN npm install \
## && npm ls \
## && npm cache clean --force \
## && mv /app/node_modules /node_modules
#RUN npm install 
##RUN npm ls
#RUN npm cache clean --force 
#RUN mv /app/node_modules /node_modules
#COPY . /app
##RUN chmod 755 /app/result_live_chk.sh
#ENV PORT 80
#EXPOSE 80
#CMD ["node", "server/server.js"]
#CMD exec /bin/sh -c "trap : TERM INT; (while true; do sleep 1000; done) & wait"
