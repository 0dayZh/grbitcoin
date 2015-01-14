FROM ubuntu:latest
MAINTAINER 0dayZh <0day.zh@gmail.com>
ENV REFRESHED_AT 2015-01-14

# Environment defines

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_VERSION 0.11.14

# System

RUN apt-get -yqq update
RUN apt-get install -y make gcc g++ python curl libssl-dev

# Install node

RUN curl -L# http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz | tar -zx --strip 1 -C /usr/local

# Clean up

RUN rm -fr /usr/src/node

# Add app

ADD . /opt/grbitcoin/

# Install nodeapp dependencies

WORKDIR /opt/grbitcoin/
RUN npm install

# Expose port

EXPOSE 8481

# Start running

ENTRYPOINT npm start
