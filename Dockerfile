FROM nikolaik/python-nodejs:python3.8-nodejs14 as base

WORKDIR /var/www
COPY . .

# Install Python Dependencies
RUN ["pip", "install", "-r", "requirements.txt"]
RUN ["pip", "install", "psycopg2"]


# Build our React App
RUN ["npm", "install", "--prefix", "client"]
RUN ["npm", "run", "build", "--prefix", "client"]

# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
RUN ["cp", "-r", "client/build", "app_container/static"]
RUN ["cp", "-r", "app_container/static/static/js", "app_container/static"]
RUN ["cp", "-r", "app_container/static/static/css", "app_container/static"]
# RUN ["cp", "-r", "app_container/static/static/media", "app_container/static"]

# Setup Flask environment
ENV FLASK_APP=app_container
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV REACT_APP_BASE_URL=https://janders-todo.herokuapp.com/

EXPOSE 8000

# Run flask environment
CMD gunicorn app_container:app
