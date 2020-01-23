FROM ubuntu:18.04

# Basic dependencies
RUN apt-get update
RUN apt-get -y autoremove
RUN apt-get install -y curl wget
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common libffi-dev nodejs yarn

# Setup Ruby
RUN wget http://ftp.ruby-lang.org/pub/ruby/2.6/ruby-2.6.5.tar.gz
RUN tar -xzvf ruby-2.6.5.tar.gz
WORKDIR /ruby-2.6.5
RUN ./configure
RUN make
RUN make install

# Setup gems
RUN gem install bundler
RUN gem install rails -v 6.0.2.1

# Setup database (extra lines are for tzdata)
RUN export DEBIAN_FRONTEND=noninteractive 
RUN ln -fs /usr/share/zoneinfo/Asia/Singapore /etc/localtime
RUN apt-get install -y tzdata
RUN dpkg-reconfigure --frontend noninteractive tzdata
RUN apt-get install -y postgresql libpq-dev

# Clone this repo and install gems
RUN git clone https://github.com/wltan/cvwo-assignment.git
WORKDIR /cvwo-assignment/code
RUN bundle install

# Start the server
CMD rails s
