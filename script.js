document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현 (이전과 동일)
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

    // 2. 텍스트 렌더링 기능 (이전과 동일)
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

    // 3. 타이포그래피 컨트롤 기능 (이전과 동일)
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

    // 4. 템플릿 기능 구현 (▼▼▼ 이 부분이 수정됨 ▼▼▼)
    const templateButtonsContainer = document.querySelector('.template-buttons');
    if (templateButtonsContainer) {
        templateButtonsContainer.addEventListener('click', (event) => {
            if (!event.target.classList.contains('template-btn')) return;

            const templateType = event.target.dataset.template;
            const allUnits = textContentWrapper.querySelectorAll('.editable-unit');

            allUnits.forEach(unit => unit.style.cssText = '');

            switch (templateType) {
                case 'first-letter-bold':
                    // [수정] 각 줄의 첫 글자를 찾아서 굵게 만듭니다.
                    allUnits.forEach(unit => {
                        const prevSibling = unit.previousSibling;
                        // 첫 번째 요소이거나, 바로 앞 요소가 <br> 태그일 경우
                        if (prevSibling === null || (prevSibling.tagName && prevSibling.tagName.toUpperCase() === 'BR')) {
                            unit.style.fontWeight = '900';
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
                    // [수정] 바로 앞 글자가 공백이나 <br>이 아닐 경우에만 조사로 판단합니다.
                    const particles = ['은', '는', '이', '가', '을', '를', '의', '에', '도', '만'];
                    allUnits.forEach(unit => {
                        const prevSibling = unit.previousSibling;
                        // 조사가 맞는지 확인하고, 앞 글자가 있는지, 그리고 앞 글자가 <br>이 아닌지 확인
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
});
