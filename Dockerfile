FROM ubuntu: 14.04
MAINTAINER 0dayZh  <0day.zh@gmail.com>
ENV REFRESHED_AT  2015-01-13

RUN apt-get -yqq update
RUN apt-get -yqq install git
RUN git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
RUN echo ". ~/.nvm/nvm.sh" >> ~/.bashrc
RUN source ~/.bashrc
RUN nvm install v0.11.4 && nvm use v0.11.4 && nvm alias default v0.11.4

ADD . /opt/grbitcoin/

WORKDIR /opt/grbitcoin/
RUN npm install

EXPOSE 8481

ENTRYPOINT npm start
