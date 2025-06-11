# backend/app.py

from flask import Flask, jsonify
from flask_cors import CORS # CORS 설정을 위해 추가

app = Flask(__name__)
CORS(app) # 모든 출처(Origin)에서의 요청을 허용하도록 CORS 설정

# 퀴즈 문항 데이터
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
    }
]

@app.route('/')
def index():
    # 이 경로는 컨테이너 외부에서 직접 접근할 때 확인용입니다.
    # Nginx 프록시를 통하면 이 메시지는 보이지 않습니다.
    return "Flask 백엔드 서버가 실행 중입니다!"

# backend/app.py 파일 중 해당 부분

@app.route('/api/quiz', methods=['GET'])
def get_quiz_questions():
    # 퀴즈 데이터를 JSON 형태로 반환
    return jsonify(quiz_questions)

# ... (나머지 코드) ...


if __name__ == '__main__':
    # 이 블록은 Dockerfile의 CMD 명령어가 아닌, 로컬에서 직접 실행할 때 사용됩니다.
    # Dockerfile에서는 Gunicorn을 사용하도록 설정했습니다.
    app.run(debug=True, host='0.0.0.0', port=5000)
