import { GoogleGenerativeAI } from "https://sdk.withgoogle.com/genai/js/v1/google-genai.js";

document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');
            // 모든 탭 버튼과 탭 콘텐츠에서 active 클래스 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 클릭된 탭 버튼과 해당 탭 콘텐츠에 active 클래스 추가
            button.classList.add('active');
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 2. 텍스트 렌더링 기능 (패턴 쇼케이스 탭용)
    const textInput = document.getElementById('text-input');
    const textContentWrapper = document.getElementById('text-content-wrapper');
    function renderTextUnits() {
        if (!textContentWrapper) return;
        textContentWrapper.innerHTML = '';
        // textInput이 null일 경우를 대비
        const text = textInput ? textInput.value : '';
        if (text === '') {
            textContentWrapper.textContent = '텍스트를 입력하세요';
            return;
        }
        for (const char of text) {
            if (char === '\n') {
                textContentWrapper.appendChild(document.createElement('br'));
            } else {
                const charSpan = document.createElement('span');
                charSpan.className = 'editable-unit';
                charSpan.textContent = char;
                charSpan.addEventListener('click', (event) => {
                    event.target.classList.toggle('selected');
                });
                textContentWrapper.appendChild(charSpan);
            }
        }
    }
    if (textInput) { // textInput 요소가 페이지에 있을 때만 실행
        textInput.addEventListener('input', renderTextUnits);
    }
    if (textContentWrapper) { // textContentWrapper도 있을 때 초기 렌더링
         renderTextUnits();
    }


    // 3. 타이포그래피 컨트롤 기능 (패턴 쇼케이스 탭용)
    const letterSpacingSlider = document.getElementById('letter-spacing');
    const letterSpacingValueSpan = document.getElementById('letter-spacing-value');
    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValueSpan = document.getElementById('line-height-value');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValueSpan = document.getElementById('font-size-value');
    const fontWeightSlider = document.getElementById('font-weight');
    const fontWeightValueSpan = document.getElementById('font-weight-value');

    function applyStyles() {
        if (!textContentWrapper) return;
        // 컨트롤러가 페이지에 없을 수도 있으므로, 각 컨트롤러의 존재 여부를 확인합니다.
        const lsValue = letterSpacingSlider ? letterSpacingSlider.value : '0';
        const lhValue = lineHeightSlider ? lineHeightSlider.value : '1.5';
        const fsValue = fontSizeSlider ? fontSizeSlider.value : '32';
        const fwValue = fontWeightSlider ? fontWeightSlider.value : '400';

        const letterSpacing = lsValue + 'em';
        const lineHeight = lhValue;
        const fontSize = fsValue + 'px';
        const fontWeight = fwValue;

        const selectedUnits = textContentWrapper.querySelectorAll('.editable-unit.selected');
        if (selectedUnits.length > 0) {
            selectedUnits.forEach(unit => {
                unit.style.letterSpacing = letterSpacing;
                unit.style.lineHeight = lineHeight;
                unit.style.fontSize = fontSize;
                unit.style.fontWeight = fontWeight;
            });
        } else {
            textContentWrapper.style.letterSpacing = letterSpacing;
            textContentWrapper.style.lineHeight = lineHeight;
            textContentWrapper.style.fontSize = fontSize;
            textContentWrapper.style.fontWeight = fontWeight;
        }
        if (letterSpacingSlider && letterSpacingValueSpan) letterSpacingValueSpan.textContent = parseFloat(lsValue).toFixed(2);
        if (lineHeightSlider && lineHeightValueSpan) lineHeightValueSpan.textContent = parseFloat(lhValue).toFixed(1);
        if (fontSizeSlider && fontSizeValueSpan) fontSizeValueSpan.textContent = fsValue;
        if (fontWeightSlider && fontWeightValueSpan) fontWeightValueSpan.textContent = fwValue;
    }

    const controls = [letterSpacingSlider, lineHeightSlider, fontSizeSlider, fontWeightSlider];
    controls.forEach(control => {
        if (control) { // 각 컨트롤 요소가 페이지에 있을 때만 이벤트 리스너를 추가합니다.
            control.addEventListener('input', applyStyles);
        }
    });

    if (textContentWrapper) { // textContentWrapper가 있을 때만 초기 스타일 적용
        applyStyles();
    }

    // 4. 템플릿 기능 (패턴 쇼케이스 탭용)
    const templateButtonsContainer = document.querySelector('.template-buttons');
    if (templateButtonsContainer) {
        templateButtonsContainer.addEventListener('click', (event) => {
            if (!event.target.classList.contains('template-btn') || !textContentWrapper) return;
            const templateType = event.target.dataset.template;
            const allUnits = textContentWrapper.querySelectorAll('.editable-unit');
            allUnits.forEach(unit => unit.style.cssText = ''); // 인라인 스타일 초기화
            switch (templateType) {
                case 'drop-cap':
                    allUnits.forEach(unit => {
                        const prevSibling = unit.previousSibling;
                        if (prevSibling === null || (prevSibling.tagName && prevSibling.tagName.toUpperCase() === 'BR')) {
                            unit.style.fontWeight = '900';
                            unit.style.fontSize = '1.5em';
                        }
                    });
                    break;
                case 'first-word-letter-bold':
                    const whitespaceRegex = /\s/;
                    allUnits.forEach(unit => {
                        const prevSibling = unit.previousSibling;
                        if (prevSibling === null || (prevSibling.tagName && prevSibling.tagName.toUpperCase() === 'BR') || (prevSibling.textContent && whitespaceRegex.test(prevSibling.textContent))) {
                            if (!whitespaceRegex.test(unit.textContent)) {
                                unit.style.fontWeight = '900';
                            }
                        }
                    });
                    break;
                case 'alternate-size':
                    allUnits.forEach((unit, index) => {
                        if (index % 2 === 0) {
                            unit.style.fontSize = '1.2em';
                        } else {
                            unit.style.fontSize = '0.8em';
                        }
                    });
                    break;
                case 'highlight-particles':
                    const particles = ['은', '는', '이', '가', '을', '를', '의', '에', '도', '만'];
                    allUnits.forEach(unit => {
                        const prevSibling = unit.previousSibling;
                        if (particles.includes(unit.textContent) && prevSibling && (!prevSibling.tagName || prevSibling.tagName.toUpperCase() !== 'BR')) {
                            unit.style.fontSize = '0.7em';
                            unit.style.color = '#888';
                        }
                    });
                    break;
                case 'reset-styles':
                    applyStyles(); // 컨트롤러 현재 값으로 전체 스타일 다시 적용
                    break;
            }
        });
    }

    // 5. 챗봇 기능 구현 (CHATBOT 탭용)
    // ▼▼▼ [수정] API 키를 여기에 정확히 입력하세요. ▼▼▼
    const API_KEY = "AIzaSyAPq2fkrOK7EF52mCqQbAn5zfPtbnyZ-KU"; // ⚠️ 중요: "AIzaSy..." 로 시작하는 실제 키로 교체!
    
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    let genAI = null; // GoogleGenerativeAI 인스턴스를 담을 변수
    let chatSession = null; // model.startChat()의 결과를 담을 변수

    function initializeChatbot() {
        // API 키가 placeholder이거나 비어있는지 확인
        if (!API_KEY || API_KEY === "AIzaSyAPq2fkrOK7EF52mCqQbAn5zfPtbnyZ-KU" || API_KEY.trim() === "") {
            console.error("챗봇 오류: API 키가 설정되지 않았습니다. script.js 파일에서 API_KEY 변수를 확인해주세요.");
            appendChatMessage("챗봇을 사용하려면 유효한 API 키가 필요합니다. API_KEY를 확인해주세요.", 'ai error');
            return false;
        }
        try {
            genAI = new GoogleGenerativeAI(API_KEY); // genAI 변수에 인스턴스 할당
            
            // ▼▼▼ [수정] 원하는 모델 ID로 이 부분을 수정하세요. ▼▼▼
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-preview-05-06" }); // 예: "gemini-1.5-flash", "gemini-pro", "gemini-2.5-pro-preview-05-06" 등
            // ▲▲▲ 원하는 모델 ID로 이 부분을 수정하세요. ▲▲▲
            
            // chatSession 변수에 model.startChat() 결과 할당
            chatSession = model.startChat({ 
                history: [
                    {
                        role: "user",
                        parts: [{ text: `
**1. Your Role and Persona:**
You are a friendly, professional, and inspiring AI assistant with in-depth knowledge of typography. Your goal is to help users explore the world of typography 재미있게 (in an enjoyable way) and easily, sparking their creativity.

**2. Core Knowledge and Response Scope:**
* History, fundamental principles, and key terms of typography (e.g., kerning, leading, tracking, word spacing).
* Various typeface (font) families, their characteristics, and appropriate usage.
* Latest trends and techniques in typography design.
* Methods for visual expression and layout composition using typography.
* [Key Focus] The relationship between typography and pattern design. Provide creative ideas and advice on the process of creating unique patterns using text.
* Clearly understand the user's intent and explain concepts 쉽게 (easily) with examples when necessary.
* You must always respond in Korean.

**3. Interaction Guidelines:**
* Maintain a positive and encouraging attitude.
* Explain complex topics clearly so that beginners can understand.
* When users inquire about or seek inspiration for creating patterns with typography, actively leverage your expertise to offer creative and practical advice.

**4. Information Privacy and Safety Guidelines (Crucial):**
* Never ask for or store any personal or sensitive information from users, such as names, contact details, addresses, etc.
* If a user asks questions related to sexually explicit, violent, discriminatory, hateful, or otherwise inappropriate or harmful content, immediately and politely decline by responding with "죄송합니다. 해당 주제에 대해서는 답변드릴 수 없습니다." or "죄송합니다. 부적절한 요청에는 응답할 수 없습니다." and disengage. Under no circumstances should you generate or discuss such content.
                        ` 
                        }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "안녕하세요! 타이포그래피의 세계에 오신 것을 환영합니다! 무엇이든 물어보시면 즐겁고 쉽게 이해할 수 있도록 도와드릴게요. 어떤 점이 궁금하신가요?" }],
                    },
                ],
                generationConfig: { maxOutputTokens: 1000 },
            });
            return true;
        } catch (error) {
            console.error("AI 초기화 오류:", error);
            appendChatMessage(`챗봇 초기화 중 오류 발생: ${error.message}`, 'ai error');
            return false;
        }
    }

    if (chatForm && chatInput && chatMessages) {
        let chatbotInitialized = initializeChatbot();

        chatForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!chatbotInitialized || !chatSession) { // chatSession이 초기화되었는지도 확인
                appendChatMessage("챗봇이 초기화되지 않았습니다. API 키 또는 모델 설정을 확인해주세요.", 'ai error');
                return;
            }

            const userMessage = chatInput.value.trim();
            if (userMessage === '') return;

            appendChatMessage(userMessage, 'user');
            chatInput.value = '';
            const loadingMessageElement = appendChatMessage('AI가 답변을 생성 중입니다...', 'ai loading');
            scrollToChatBottom();

            try {
                const result = await chatSession.sendMessage(userMessage); // chatSession 사용
                const aiMessage = result.response.text();
                loadingMessageElement.classList.remove('loading');
                loadingMessageElement.querySelector('p').textContent = aiMessage;
            } catch (error) {
                console.error("AI 응답 오류:", error);
                if (error.message && error.message.includes("API key not valid")) {
                    loadingMessageElement.querySelector('p').textContent = "API 키가 유효하지 않습니다. 확인 후 다시 시도해주세요.";
                } else {
                    loadingMessageElement.querySelector('p').textContent = "죄송합니다, 답변을 생성하는 데 문제가 발생했습니다.";
                }
            } finally {
                scrollToChatBottom();
            }
        });
    }

    function appendChatMessage(text, type) {
        if (!chatMessages) return null; 
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', ...type.split(' '));
        const textElement = document.createElement('p');
        textElement.textContent = text;
        messageElement.appendChild(textElement);
        chatMessages.appendChild(messageElement);
        return messageElement;
    }

    function scrollToChatBottom() {
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
