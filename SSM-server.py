from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def read_api_key(file_path):
    with open(file_path, 'r') as file:
        key = file.read().strip()
    return key

@app.route('/post', methods=['POST'])
def handle_post():
    data = request.json
    openAI_URL = 'https://api.openai.com/v1/chat/completions'
    openAI_Key = read_api_key('config.txt')
    headers = {
        'Authorization': f'Bearer {openAI_Key}',
        'Content-Type': 'application/json'
    }
    response = requests.post(openAI_URL, json=data, headers=headers)
    response_data = response.json()

    return jsonify(response_data), response.status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)
