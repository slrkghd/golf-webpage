# webpage/Dockerfile

# Nginx 공식 이미지를 베이스 이미지로 사용합니다.
FROM nginx:alpine

# Nginx의 기본 설정 파일을 삭제합니다.
RUN rm /etc/nginx/conf.d/default.conf

# 사용자 정의 Nginx 설정 파일을 컨테이너의 해당 경로로 복사합니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 현재 디렉토리의 모든 파일(HTML, CSS, JS 등)을 Nginx의 웹 서비스 디렉토리로 복사합니다.
COPY . /usr/share/nginx/html

# Nginx가 기본적으로 사용하는 80번 포트를 노출합니다.
EXPOSE 80

# Nginx 서버를 실행하는 명령어를 정의합니다.
CMD ["nginx", "-g", "daemon off;"]
