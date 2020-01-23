FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev nodejs yarn

RUN apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
RUN gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
RUN curl -sSL https://get.rvm.io | bash -s stable
RUN source ~/.rvm/scripts/rvm
RUN rvm install 2.7.0
RUN rvm use 2.7.0 --default
RUN gem install bundler

RUN gem install rails -v 6.0.2.1
RUN apt-get install postgresql-11 libpq-dev

RUN git clone https://github.com/wltan/cvwo-assignment.git
WORKDIR /cvwo-assignment/code
RUN bundle install
CMD rails s
