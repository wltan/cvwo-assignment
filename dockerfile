FROM ruby:2.6.5
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir /cvwo
COPY ./code /cvwo
WORKDIR /cvwo
RUN bundle install

EXPOSE 80

# Start the main process.
CMD rails server -p 80