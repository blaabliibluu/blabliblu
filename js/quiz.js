/**
 * Interactive Quiz - No Wrong Answers, Just Love
 */

const quizQuestions = [
    {
        question: "What do you think will happen meet eachother?",
        options: [
            "We won't stop talking",
            "Hug eachother tight enough",
            "We would laugh uncontrolablly",
            "Everything will just feel right"
        ],
        responses: [
            "Yes! We would talk for hours and it'll feel like minutes. I never wantt that conversation to end.",
            "I felt it too. thats what i want the most",
            "Mhm thats make us two",
            "Exactly. Everything will align perfectly that day. It was meant to be."
        ]
    },
    {
        question: "When do you think you first realized we had something special?",
        options: [
            "From the very beginning",
            "When i made you laugh uncontrollably",
            "During one of our deep conversations",
            "When you realized you were always thinking about you"
        ],
        responses: [
            "I knew from day one too. There was something different about you.",
            "Your laugh is my favorite sound. That moment showed me how happy I could make you.",
            "Those conversations revealed our souls to each other. That's when I knew.",
            "You were constantly on my mind too. That's when I realized you weren't just anyone."
        ]
    },
    {
        question: "What's your favorite thing about us?",
        options: [
            "How we understand each other without words",
            "The way we support each other",
            "Our ability to be completely ourselves",
            "How we make each other better"
        ],
        responses: [
            "That unspoken connection we have is rare. It's like our souls communicate.",
            "Your support means everything to me. We're each other's biggest cheerleaders.",
            "Being able to be 100% authentic with you is the greatest gift.",
            "You inspire me to be my best self."
        ]
    },
    {
        question: "What moment between us always makes you smile?",
        options: [
            "Our inside jokes that nobody else gets",
            "That laughs we took together",
            "Those late-night conversations",
            "Every time we look at each other and just know"
        ],
        responses: [
            "Those inside jokes are our secret language. They're uniquely ours.",
            "That laugh showed me how perfect we are together, even when things don't go as planned.",
            "Those 3 AM talks where we bare our souls - those are the moments I treasure most.",
            "That silent communication we have is magical. We don't need words."
        ]
    },
    {
        question: "What do you love most about us?",
        options: [
            "How we balance each other",
            "The way we can be silly together",
            "How safe and loved I feel with you",
            "That you're my best friend and my love"
        ],
        responses: [
            "We complement each other perfectly. Where I'm weak, you're strong, and vice versa.",
            "Being silly with you is one of my favorite things. You bring out my playful side.",
            "Creating that safe space for you is my priority. You should always feel loved and secure.",
            "You're my amore, my home. That's what makes us us."
        ]
    },
    {
        question: "How would you describe what we have?",
        options: [
            "A once-in-a-lifetime connection",
            "The kind of love people write about",
            "A partnership built on trust and respect",
            "Something deeper than words can express"
        ],
        responses: [
            "It truly is once in a lifetime. What we have is rare and precious.",
            "Our story deserves to be told. It's the kind that gives others hope.",
            "Trust and respect are our foundation. Everything else is built on that.",
            "Words will never be enough to capture what we have. It has to be felt."
        ]
    }
];

let currentQuestion = 0;

document.addEventListener('DOMContentLoaded', () => {
    renderProgress();
    renderQuestion();
});

function renderProgress() {
    const progressContainer = document.getElementById('quizProgress');
    progressContainer.innerHTML = '';
    
    for (let i = 0; i < quizQuestions.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        
        if (i < currentQuestion) {
            dot.classList.add('completed');
        } else if (i === currentQuestion) {
            dot.classList.add('active');
        }
        
        progressContainer.appendChild(dot);
    }
}

function renderQuestion() {
    const quizContent = document.getElementById('quizContent');
    
    if (currentQuestion >= quizQuestions.length) {
        showResults();
        return;
    }
    
    const q = quizQuestions[currentQuestion];
    
    let optionsHTML = '';
    q.options.forEach((option, index) => {
        optionsHTML += `
            <button class="option-btn" onclick="selectAnswer(${index})">
                <span class="option-icon"><i class="fas fa-heart"></i></span>
                ${option}
            </button>
        `;
    });
    
    quizContent.innerHTML = `
        <div class="question-card">
            <div class="question-number">Question ${currentQuestion + 1} of ${quizQuestions.length}</div>
            <h2 class="question-text">${q.question}</h2>
            <div class="accent-line"></div>
            <div class="options-grid">
                ${optionsHTML}
            </div>
            <div class="response-message" id="responseMessage"></div>
        </div>
    `;
}

function selectAnswer(answerIndex) {
    const q = quizQuestions[currentQuestion];
    const response = q.responses[answerIndex];
    
    // Show the loving response
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = response;
    responseMessage.classList.add('show');
    
    // Disable all option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.6';
    });
    
    // Highlight selected option
    optionBtns[answerIndex].style.borderColor = 'var(--emerald-accent)';
    optionBtns[answerIndex].style.background = 'rgba(5, 150, 105, 0.2)';
    optionBtns[answerIndex].style.opacity = '1';
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestion++;
        renderProgress();
        renderQuestion();
    }, 3000);
}

function showResults() {
    const quizContent = document.getElementById('quizContent');
    const resultScreen = document.getElementById('resultScreen');
    
    quizContent.style.display = 'none';
    resultScreen.classList.add('active');
}
