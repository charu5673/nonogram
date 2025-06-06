from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from flask import request

from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient(MONGO_URI)
db = client["Nonogram"]
collection = db["Puzzles"]

@app.route("/random_puzzle")
def get_random_puzzle():
    difficulty = request.args.get("difficulty")
    if not difficulty:
        return jsonify({"error": "Difficulty not specified"}), 400
    
    if difficulty == 'easy':
        difficultyVal = 1
    elif difficulty == 'medium':
        difficultyVal = 2
    else: difficultyVal = 3

    pipeline = [
        {"$match": {"difficulty": difficultyVal}},
        {"$sample": {"size": 1}},
        {"$project": {"_id": 0}}
    ]

    result = list(collection.aggregate(pipeline))
    if result:
        return jsonify(result[0])
    else:
        return jsonify({"error": "No puzzle found with that difficulty"}), 404