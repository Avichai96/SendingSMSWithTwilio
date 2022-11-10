import flask
import json
from twilio.rest import Client
from flask_cors import CORS
app = flask.Flask(__name__)
cors = CORS(app, resources={r"/post-message": {"origins": "*"}})

account_sid = "AC1c51a3a203e7da09b7962d10a2de5cdf"
auth_token  = "ec76e23b64ce690180fc924addb61475"
messaging_service_sid='MG7308e016671eec596bb282d6d87052d8'


@app.route('/post-message', methods=['POST'])
def get_message():
    data = flask.request.json
    print("--->", data)

    client = Client(account_sid, auth_token) 
    message = client.messages.create(
        messaging_service_sid=messaging_service_sid,
        body=data['messageText'],      
        to=data['toPhoneNumber'] 
    ) 
    print(message.body)

    response = flask.jsonify({'phoneNumber': data['toPhoneNumber'], 'messageBody': data['messageText']})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
