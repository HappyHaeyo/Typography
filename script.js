// Google AI SDK에서 필요한 클래스를 가져옵니다.
import { GoogleGenerativeAI } from "https://sdk.withgoogle.com/genai/js/v1/google-genai.js";

document.addEventListener('DOMContentLoaded', () => {

    // (기존 1, 2, 3번 코드는 그대로 유지)
    // ...

    // 5. 챗봇 기능 구현
    const API_KEY = "YOUR_API_KEY"; // 여기에 Google AI Studio에서 발급받은 API 키를 입력하세요.
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // API 클라이언트 초기화
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 챗봇 시스템 프롬프트 (고정)
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "당신은 타이포그래피에 대해 모든 것을 알고 있는 친절하고 전문적인 AI 어시스턴트입니다. 사용자의 질문에 명확하고 이해하기 쉽게 답변해주세요." }],
            },
            {
                role: "model",
                parts: [{ text: "네, 알겠습니다! 저는 타이포그래피 전문가입니다. 무엇이든 물어보세요." }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });


    async function handleChatSubmit(event) {
        event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        // 사용자 메시지를 화면에 표시
        appendMessage(userMessage, 'user');
        chatInput.value = ''; // 입력창 비우기

        // 로딩 메시지 표시
        const loadingMessageElement = appendMessage('AI가 생각 중입니다...', 'ai loading');
        chatMessages.scrollTop = chatMessages.scrollHeight; // 스크롤을 맨 아래로

        try {
            const result = await chat.sendMessage(userMessage);
            const response = result.response;
            const aiMessage = response.text();
            
            // 로딩 메시지를 실제 AI 답변으로 교체
            loadingMessageElement.classList.remove('loading');
            loadingMessageElement.querySelector('p').textContent = aiMessage;

        } catch (error) {
            console.error("AI 응답 오류:", error);
            loadingMessageElement.querySelector('p').textContent = "죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.";
        } finally {
            chatMessages.scrollTop = chatMessages.scrollHeight; // 스크롤을 맨 아래로
        }
    }

    function appendMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', type);
        
        const textElement = document.createElement('p');
        textElement.textContent = text;
        
        messageElement.appendChild(textElement);
        chatMessages.appendChild(messageElement);
        return messageElement;
    }

    chatForm.addEventListener('submit', handleChatSubmit);

});

// 기존의 모든 코드를 포함한 완전한 파일입니다. 아래 코드를 script.js에 붙여넣으세요.

import { GoogleGenerativeAI } from "https://sdk.withgoogle.com/genai/js/v1/google-genai.js";

document.addEventListener('DOMContentLoaded', () => {

    // --- (기존 1, 2, 3, 4번 코드 여기에 모두 포함) ---
    // 1. 탭 네비게이션 ...
    // 2. 텍스트 렌더링 ...
    // 3. 컨트롤 기능 ...
    // 4. 템플릿 기능 ...

    // 5. 챗봇 기능 구현
    const API_KEY = " 여기에_본인의_API_키를_넣으세요 "; // ⚠️ 중요: 본인의 API 키로 교체!

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatForm) return; // 챗봇 기능이 없는 페이지에서는 실행 안함

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [ /* ... (시스템 프롬프트) ... */ ],
            generationConfig: { maxOutputTokens: 500 },
        });

        chatForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const userMessage = chatInput.value.trim();
            if (userMessage === '') return;

            appendMessage(userMessage, 'user');
            chatInput.value = '';
            
            const loadingMessageElement = appendMessage('AI가 생각 중입니다...', 'ai loading');
            chatMessages.scrollTop = chatMessages.scrollHeight;

            try {
                const result = await chat.sendMessage(userMessage);
                const response = result.response;
                const aiMessage = response.text();
                loadingMessageElement.classList.remove('loading');
                loadingMessageElement.querySelector('p').textContent = aiMessage;
            } catch (error) {
                console.error("AI 응답 오류:", error);
                loadingMessageElement.querySelector('p').textContent = "죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.";
            } finally {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });

    } catch (error) {
        console.error("AI 초기화 오류:", error);
        appendMessage("챗봇을 초기화하는 데 실패했습니다. API 키를 확인해주세요.", 'ai');
    }

    function appendMessage(text, type) {
        // ... (메시지 추가 함수) ...
    }
});


// --- 위 코드를 아래의 완전한 코드로 대체합니다 ---
import { GoogleGenerativeAI } from "https://sdk.withgoogle.com/genai/js/v1/google-genai.js";

document.addEventListener('DOMContentLoaded', () => {
    // (기존의 1, 2, 3, 4번 코드 전체가 이 자리에 있어야 합니다)

    // 5. 챗봇 기능 구현
    const API_KEY = "YOUR_API_KEY"; // ⚠️ 중요: 본인의 API 키로 교체!

    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatForm) return;

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "당신은 타이포그래피에 대해 모든 것을 알고 있는 친절하고 전문적인 AI 어시스턴트입니다. 사용자의 질문에 명확하고 이해하기 쉽게 답변해주세요." }], },
                { role: "model", parts: [{ text: "네, 알겠습니다! 저는 타이포그래피 전문가입니다. 무엇이든 물어보세요." }], },
            ],
            generationConfig: { maxOutputTokens: 500 },
        });

        chatForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const userMessage = chatInput.value.trim();
            if (userMessage === '') return;

            appendMessage(userMessage, 'user');
            chatInput.value = '';
            
            const loadingMessageElement = appendMessage('AI가 생각 중입니다...', 'ai loading');
            scrollToBottom();

            try {
                const result = await chat.sendMessage(userMessage);
                const aiMessage = result.response.text();
                loadingMessageElement.classList.remove('loading');
                loadingMessageElement.querySelector('p').textContent = aiMessage;
            } catch (error) {
                console.error("AI 응답 오류:", error);
                loadingMessageElement.querySelector('p').textContent = "죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.";
            } finally {
                scrollToBottom();
            }
        });

    } catch (error) {
        console.error("AI 초기화 오류:", error);
        appendMessage("챗봇을 초기화하는 데 실패했습니다. API 키를 확인해주세요.", 'ai');
    }

    function appendMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', ...type.split(' '));
        const textElement = document.createElement('p');
        textElement.textContent = text;
        messageElement.appendChild(textElement);
        chatMessages.appendChild(messageElement);
        return messageElement;
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

// --- 위 코드를 아래의 완전한 코드로 대체합니다 --- (최종본)
import { GoogleGenerativeAI } from "https://sdk.withgoogle.com/genai/js/v1/google-genai.js";

document.addEventListener('DOMContentLoaded', () => {

    // (여기에 기존 1, 2, 3, 4번 코드 전체를 붙여넣으세요)
    // 예시:
    // const tabButtons = document.querySelectorAll('.tab-button');
    // ... 등등 ...
    
    // 5. 챗봇 기능 구현
    const API_KEY = "YOUR_API_KEY"; // ⚠️ 중요: 본인의 API 키로 교체!
    // ... (이하 챗봇 로직)
});
