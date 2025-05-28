document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현 (이전과 동일)
    // ... (이전과 동일한 코드 생략)

    // 2. 텍스트 렌더링 기능 (이전과 동일)
    // ... (이전과 동일한 코드 생략)

    // 3. 타이포그래피 컨트롤 기능 구현 (이전과 동일)
    // ... (이전과 동일한 코드 생략)

    // ▼▼▼ [새로 추가] 4. 템플릿 기능 구현 ▼▼▼
    const templateButtonsContainer = document.querySelector('.template-buttons');

    if (templateButtonsContainer) {
        templateButtonsContainer.addEventListener('click', (event) => {
            // 클릭된 요소가 .template-btn 클래스를 가졌는지 확인
            if (!event.target.classList.contains('template-btn')) return;

            const templateType = event.target.dataset.template;
            const allUnits = textContentWrapper.querySelectorAll('.editable-unit');

            // 모든 글자의 인라인 스타일을 먼저 초기화
            allUnits.forEach(unit => unit.style.cssText = '');

            switch (templateType) {
                case 'first-letter-bold':
                    if (allUnits.length > 0) {
                        allUnits[0].style.fontWeight = '900'; // 첫 글자만 굵게
                    }
                    break;
                
                case 'alternate-size':
                    allUnits.forEach((unit, index) => {
                        if (index % 2 === 0) { // 짝수 인덱스 글자
                            unit.style.fontSize = '1.2em';
                        } else { // 홀수 인덱스 글자
                            unit.style.fontSize = '0.8em';
                        }
                    });
                    break;

                case 'highlight-particles':
                    const particles = ['은', '는', '이', '가', '을', '를', '의', '에'];
                    allUnits.forEach(unit => {
                        if (particles.includes(unit.textContent)) {
                            unit.style.fontSize = '0.7em'; // 조사만 작게
                            unit.style.color = '#888'; // 회색으로 (예시)
                        }
                    });
                    break;

                case 'reset-styles':
                    // 위에서 이미 모든 스타일을 초기화했으므로, 여기서는 특별한 동작이 필요 없음
                    // 또는 전체 스타일을 applyStyles()로 다시 적용할 수도 있음
                    applyStyles(); // 컨트롤러 현재 값으로 전체 스타일 다시 적용
                    break;
            }
        });
    }

});

// 이전 코드의 모든 내용을 포함한 전체 script.js 파일입니다.
// 아래 코드를 script.js 파일에 그대로 붙여넣으세요.
document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => { /* ... */ });

    // 2. 텍스트 렌더링 기능
    const textInput = document.getElementById('text-input');
    const textContentWrapper = document.getElementById('text-content-wrapper');
    function renderTextUnits() { /* ... */ }
    textInput.addEventListener('input', renderTextUnits);
    if (textContentWrapper) { renderTextUnits(); }

    // 3. 타이포그래피 컨트롤 기능
    const letterSpacingSlider = document.getElementById('letter-spacing');
    // ... (다른 컨트롤러 선택)
    function applyStyles() { /* ... */ }
    // ... (이벤트 리스너 추가)
    if (textContentWrapper) { applyStyles(); }

    // 4. 템플릿 기능 구현 (위에서 설명한 코드)
    const templateButtonsContainer = document.querySelector('.template-buttons');
    if (templateButtonsContainer) {
        templateButtonsContainer.addEventListener('click', (event) => {
            // ... (템플릿 로직)
        });
    }
});

// --- 위 코드를 아래의 완전한 코드로 대체합니다 ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현
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
    textInput.addEventListener('input', renderTextUnits);
    if (textContentWrapper) {
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
    letterSpacingSlider.addEventListener('input', applyStyles);
    lineHeightSlider.addEventListener('input', applyStyles);
    fontSizeSlider.addEventListener('input', applyStyles);
    fontWeightSlider.addEventListener('input', applyStyles);
    if (textContentWrapper) {
        applyStyles();
    }

    // 4. 템플릿 기능 구현
    const templateButtonsContainer = document.querySelector('.template-buttons');
    if (templateButtonsContainer) {
        templateButtonsContainer.addEventListener('click', (event) => {
            if (!event.target.classList.contains('template-btn')) return;

            const templateType = event.target.dataset.template;
            const allUnits = textContentWrapper.querySelectorAll('.editable-unit');

            // 모든 글자의 인라인 스타일을 먼저 초기화
            allUnits.forEach(unit => unit.style.cssText = '');

            switch (templateType) {
                case 'first-letter-bold':
                    if (allUnits.length > 0) {
                        allUnits[0].style.fontWeight = '900';
                    }
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
                    const particles = ['은', '는', '이', '가', '을', '를', '의', '에'];
                    allUnits.forEach(unit => {
                        if (particles.includes(unit.textContent)) {
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
});
