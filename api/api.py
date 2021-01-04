import time
from flask import Flask

app = Flask(__name)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}
