# backend/app.py 파일 중 해당 부분

from flask import Flask, jsonify
from flask_cors import CORS # CORS 설정을 위해 추가

app = Flask(__name__)
CORS(app) # 모든 출처(Origin)에서의 요청을 허용하도록 CORS 설정

# 퀴즈 문항 데이터
# backend/app.py 파일 중 quiz_questions 변수 부분

# 퀴즈 문항 데이터 (총 10개 문항)
quiz_questions = [
    {
        "question": "골프에서 18홀 기준 타수를 의미하는 단어는 무엇일까요?",
        "options": ["버디", "보기", "파", "이글"],
        "answer": "파"
    },
    {
        "question": "티샷을 할 때 사용하는 가장 긴 클럽의 이름은 무엇일까요?",
        "options": ["아이언", "우드", "퍼터", "드라이버"],
        "answer": "드라이버"
    },
    {
        "question": "홀컵에 가장 가까이 붙이기 위해 사용하는 클럽으로, 로프트 각도가 큰 것이 특징인 클럽은 무엇일까요?",
        "options": ["드라이버", "아이언", "웨지", "퍼터"],
        "answer": "웨지"
    },
    {
        "question": "골프 코스에서 홀까지의 거리가 가장 짧은 홀을 보통 몇 타 기준으로 정할까요?",
        "options": ["파3", "파4", "파5", "파6"],
        "answer": "파3"
    },
    {
        "question": "골프 경기 중 공이 물에 빠졌을 때 적용되는 규칙과 관련된 구역은 무엇일까요?",
        "options": ["벙커", "러프", "페어웨이", "해저드"],
        "answer": "해저드"
    },
    # 새로운 퀴즈 문항 추가
    {
        "question": "기준 타수보다 한 타 적게 홀인하는 것을 무엇이라고 할까요?",
        "options": ["보기", "파", "버디", "이글"],
        "answer": "버디"
    },
    {
        "question": "기준 타수보다 두 타 적게 홀인하는 것을 무엇이라고 할까요?",
        "options": ["버디", "이글", "알바트로스", "파"],
        "answer": "이글"
    },
    {
        "question": "티샷한 공이 페어웨이를 벗어나 잔디가 길게 자란 구역을 무엇이라고 할까요?",
        "options": ["그린", "벙커", "러프", "페어웨이"],
        "answer": "러프"
    },
    {
        "question": "홀컵 주변의 잘 정돈된 짧은 잔디 구역을 무엇이라고 할까요?",
        "options": ["페어웨이", "러프", "벙커", "그린"],
        "answer": "그린"
    },
    {
        "question": "골프 코스에 있는 모래 함정을 무엇이라고 할까요?",
        "options": ["해저드", "러프", "벙커", "그린"],
        "answer": "벙커"
    }
]


@app.route('/')
def index():
    return "Flask 백엔드 서버가 실행 중입니다!"

@app.route('/api/quiz', methods=['GET'])
def get_quiz_questions():
    # 퀴즈 데이터를 JSON 형태로 반환
    return jsonify(quiz_questions)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
