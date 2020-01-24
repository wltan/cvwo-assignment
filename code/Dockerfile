FROM ruby:2.6.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /cvwo
COPY . /cvwo
WORKDIR /cvwo
RUN gem install bundler
RUN bundle install

EXPOSE 3000

# Start the main process.
CMD rails server
