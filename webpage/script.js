// 퀴즈 관련 HTML 요소들을 가져옵니다.
// 이 요소들은 quiz.html 페이지에만 존재합니다.
const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-quiz');
const resultDiv = document.getElementById('quiz-result');

let currentQuizQuestions = []; // 백엔드에서 가져온 퀴즈 데이터를 저장할 변수

// 퀴즈를 화면에 표시하는 함수 (데이터를 비동기로 가져옴)
async function displayQuiz() {
    // 퀴즈 컨테이너 요소가 없으면 함수 실행 중단 (퀴즈 페이지가 아님)
    if (!quizContainer) {
        console.log("퀴즈 컨테이너를 찾을 수 없습니다. 퀴즈 페이지가 아닙니다.");
        return;
    }

    quizContainer.innerHTML = '<p>퀴즈 문항을 불러오는 중...</p>'; // 로딩 메시지

    try {
        // 백엔드 API에서 퀴즈 데이터 가져오기
        // Nginx 프록시를 통해 백엔드로 요청을 보냅니다.
        const response = await fetch('/api/quiz');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        currentQuizQuestions = await response.json(); // 가져온 데이터를 변수에 저장

        quizContainer.innerHTML = ''; // 로딩 메시지 지우기

        if (currentQuizQuestions.length === 0) {
            quizContainer.innerHTML = '<p>퀴즈 문항이 없습니다.</p>';
            // 정답 확인 버튼이 있다면 숨김
            if (submitButton) submitButton.style.display = 'none';
            return;
        }

        // 퀴즈 문항들을 화면에 표시
        currentQuizQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <p><strong>${index + 1}. ${q.question}</strong></p>
                <div class="options">
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" name="question${index}" value="${option}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            `;
            quizContainer.appendChild(questionElement);
        });

        // 퀴즈가 표시되면 정답 확인 버튼을 보이게 함 (버튼 요소가 있다면)
        if (submitButton) {
             submitButton.style.display = 'block';
        }


    } catch (error) {
        console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
        // 오류 메시지를 퀴즈 컨테이너에 표시 (컨테이너 요소가 있다면)
        if (quizContainer) {
            quizContainer.innerHTML = '<p>퀴즈를 불러오는데 실패했습니다. 서버 상태를 확인해주세요.</p>';
        }
        // 정답 확인 버튼이 있다면 숨김
        if (submitButton) submitButton.style.display = 'none';
    }
}

// 정답을 확인하고 결과를 표시하는 함수
function checkQuiz() {
    // 퀴즈 컨테이너나 데이터가 없으면 함수 실행 중단
    if (!quizContainer || currentQuizQuestions.length === 0) {
        console.log("퀴즈가 로드되지 않았거나 퀴즈 페이지가 아닙니다.");
        return;
    }

    let score = 0;
    currentQuizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
            }
        }
    });

    // 결과 영역 요소가 있다면 결과 표시
    if (resultDiv) {
        resultDiv.innerHTML = `<h3>퀴즈 결과</h3><p>총 ${currentQuizQuestions.length} 문제 중 ${score} 문제를 맞히셨습니다!</p>`;
    }
    // 필요하다면 각 문제별 정오답 표시 기능 추가 가능
}

// HTML 문서 로딩이 완료되면 실행
document.addEventListener('DOMContentLoaded', () => {
    // 퀴즈 관련 요소들이 모두 페이지에 존재하는지 확인
    if (quizContainer && submitButton && resultDiv) {
        console.log("퀴즈 관련 요소들을 찾았습니다. 퀴즈 로직을 실행합니다.");
        displayQuiz(); // 퀴즈 표시 함수 호출
        // '정답 확인' 버튼에 클릭 이벤트 리스너 추가
        submitButton.addEventListener('click', checkQuiz);
    } else {
        console.log("현재 페이지는 퀴즈 페이지가 아닌 것 같습니다. 퀴즈 로직을 건너뜁니다.");
        // 퀴즈 페이지가 아닌 경우, 퀴즈 관련 요소가 없으므로 오류가 발생하지 않습니다.
    }
});
