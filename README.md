#골프 정보 웹페이지
이 프로젝트는 골프 클럽 선택 가이드, 주요 골프 브랜드 소개, 그리고 간단한 골프 퀴즈를 제공하는 웹페이지입니다. HTML, CSS, JavaScript, Flask, Docker, Docker Compose를 사용하여 개발되었습니다.

## 사용 기술

*   HTML, CSS, JavaScript (프론트엔드)
*   Flask (Python 백엔드 프레임워크)
*   Docker, Docker Compose (컨테이너화 및 배포)

## 실행 방법

이 프로젝트는 Docker Compose를 사용하여 쉽게 실행할 수 있습니다.

1.  이 저장소를 클론(Clone)합니다.
    ```bash
    git clone [저장소 HTTPS 또는 SSH 주소]
    cd [프로젝트 폴더 이름]
    ```
2.  Docker Desktop이 설치 및 실행 중인지 확인합니다.
3.  프로젝트 최상위 폴더에서 다음 명령어를 실행하여 이미지를 빌드하고 컨테이너를 실행합니다.
    ```bash
    docker compose up
    ```
4.  컨테이너가 실행되면 웹 브라우저에서 `http://localhost`로 접속합니다.

컨테이너를 중지하려면 터미널에서 `Ctrl + C`를 누르거나, 백그라운드 실행 시 `docker compose down` 명령어를 사용합니다.


## 주요 기능

*   골프 클럽 종류별 선택 가이드 제공
*   주요 골프 브랜드 (Callaway, TaylorMade, Titleist, PING) 소개
*   간단한 골프 퀴즈 기능

