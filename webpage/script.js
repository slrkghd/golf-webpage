// webpage/script.js 파일

// 퀴즈 문항 데이터는 이제 백엔드에서 가져옵니다.
// const quizQuestions = [...]; // 이 부분은 삭제하거나 주석 처리합니다.

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-quiz');
const resultDiv = document.getElementById('quiz-result');

let currentQuizQuestions = []; // 백엔드에서 가져온 퀴즈 데이터를 저장할 변수

// 퀴즈를 화면에 표시하는 함수 (데이터를 비동기로 가져옴)
async function displayQuiz() {
    quizContainer.innerHTML = '<p>퀴즈 문항을 불러오는 중...</p>'; // 로딩 메시지

    try {
        // 백엔드 API에서 퀴즈 데이터 가져오기
        // Flask 서버가 5000번 포트에서 실행된다고 가정합니다.
        const response = await fetch('/api/quiz'); // Flask 서버의 API 엔드포인트로 요청
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        currentQuizQuestions = await response.json(); // 가져온 데이터를 변수에 저장

        quizContainer.innerHTML = ''; // 로딩 메시지 지우기

        if (currentQuizQuestions.length === 0) {
            quizContainer.innerHTML = '<p>퀴즈 문항이 없습니다.</p>';
            submitButton.style.display = 'none';
            return;
        }

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

        // 퀴즈가 표시되면 정답 확인 버튼을 보이게 함
        submitButton.style.display = 'block';

    } catch (error) {
        console.error('퀴즈 데이터를 가져오는 중 오류 발생:', error);
        quizContainer.innerHTML = '<p>퀴즈를 불러오는데 실패했습니다. 서버 상태를 확인해주세요.</p>';
        submitButton.style.display = 'none';
    }
}

// 정답을 확인하고 결과를 표시하는 함수
function checkQuiz() {
    let score = 0;
    currentQuizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
            }
        }
    });

    resultDiv.innerHTML = `<h3>퀴즈 결과</h3><p>총 ${currentQuizQuestions.length} 문제 중 ${score} 문제를 맞히셨습니다!</p>`;
    // 필요하다면 각 문제별 정오답 표시 기능 추가 가능
}

// 페이지 로딩이 완료되면 퀴즈를 표시
document.addEventListener('DOMContentLoaded', () => {
    displayQuiz();
    // '정답 확인' 버튼에 클릭 이벤트 리스너 추가
    submitButton.addEventListener('click', checkQuiz);
});
