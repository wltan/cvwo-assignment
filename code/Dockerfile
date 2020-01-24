FROM ruby:2.6.5
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn
RUN mkdir /cvwo
COPY . /cvwo
WORKDIR /cvwo
RUN gem install bundler
RUN bundle install
RUN yarn install

EXPOSE 3000

CMD rails server
