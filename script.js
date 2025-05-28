import { GoogleGenerativeAI } from "https://sdk.withgoogle.com/genai/js/v1/google-genai.js";

document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 2. 텍스트 렌더링 기능
    const textInput = document.getElementById('text-input');
    const textContentWrapper = document.getElementById('text-content-wrapper');
    function renderTextUnits() {
        if (!textContentWrapper) return;
        textContentWrapper.innerHTML = '';
        const text = textInput.value;
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
    if (textInput) {
        textInput.addEventListener('input', renderTextUnits);
        renderTextUnits();
    }

    // 3. 타이포그래피 컨트롤 기능
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
        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontWeight = fontWeightSlider.value;
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
        if (letterSpacingValueSpan) letterSpacingValueSpan.textContent = parseFloat(letterSpacingSlider.value).toFixed(2);
        if (lineHeightValueSpan) lineHeightValueSpan.textContent = parseFloat(lineHeightSlider.value).toFixed(1);
        if (fontSizeValueSpan) fontSizeValueSpan.textContent = fontSizeSlider.value;
        if (fontWeightValueSpan) fontWeightValueSpan.textContent = fontWeightSlider.value;
    }
    const controls = [letterSpacingSlider, lineHeightSlider, fontSizeSlider, fontWeightSlider];
    controls.forEach(control => {
        if (control) {
            control.addEventListener('input', applyStyles);
        }
    });
    if (textContentWrapper) {
        applyStyles();
    }

    // 4. 템플릿 기능
    const templateButtonsContainer = document.querySelector('.template-buttons');
    if (templateButtonsContainer) {
        templateButtonsContainer.addEventListener('click', (event) => {
            if (!event.target.classList.contains('template-btn')) return;
            const templateType = event.target.dataset.template;
            const allUnits = textContentWrapper.querySelectorAll('.editable-unit');
            allUnits.forEach(unit => unit.style.cssText = '');
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
                    applyStyles();
                    break;
            }
        });
    }

    // 5. 챗봇 기능 구현
    const API_KEY = "YOUR_API_KEY_HERE"; // ⚠️ 중요: 본인의 API 키로 교체!
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatForm) {
        try {
            if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
                throw new Error("API 키가 설정되지 않았습니다.");
            }
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
            appendMessage(`챗봇 초기화 실패: ${error.message}`, 'ai');
        }
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
        if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
