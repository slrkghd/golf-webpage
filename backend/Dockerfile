# backend/Dockerfile

# Python 공식 이미지를 베이스 이미지로 사용합니다.
# Flask 애플리케이션은 Python으로 작성되었으므로 Python 이미지가 필요합니다.
FROM python:3.10-slim

# 작업 디렉토리를 /app으로 설정합니다.
# 컨테이너 내부에서 모든 작업은 이 디렉토리에서 이루어집니다.
WORKDIR /app

# 현재 디렉토리의 모든 파일(requirements.txt 포함)을 컨테이너의 /app 디렉토리로 복사합니다.
COPY . /app

# requirements.txt에 명시된 Python 라이브러리들을 설치합니다.
# 가상 환경에서 pip freeze > requirements.txt 명령어로 생성한 파일입니다.
RUN pip install --no-cache-dir -r requirements.txt

# Flask 애플리케이션이 실행될 포트를 노출합니다.
# app.py에서 5000번 포트를 사용하도록 설정했으므로 5000번을 노출합니다.
EXPOSE 5000

# Flask 애플리케이션을 실행하는 명령어를 정의합니다.
# Gunicorn은 Flask 애플리케이션을 안정적으로 서비스하기 위한 WSGI 서버입니다.
# pip install gunicorn 명령어로 설치해야 합니다. (requirements.txt에 포함되어 있을 것입니다)
# 0.0.0.0:5000 주소로 app 모듈의 app 객체를 실행합니다.
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
