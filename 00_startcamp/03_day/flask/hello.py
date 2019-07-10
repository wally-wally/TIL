from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello!'

@app.route('/ssafy')
def ssafy():
    return 'This is SSAFY!!'