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

    // 2. 텍스트를 "글자" 단위로 분리하고, 클릭 이벤트를 추가하는 기능 (▼▼▼ 이 부분이 수정됨 ▼▼▼)
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

        // ▼▼▼ [핵심 변경점!] 텍스트를 글자 단위 배열로 분리합니다. ▼▼▼
        const characters = text.split('');

        // 각 글자를 순회하며 span으로 만듭니다.
        characters.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'editable-unit';
            charSpan.textContent = char;

            // 각 글자(span)에 클릭 이벤트를 추가합니다.
            charSpan.addEventListener('click', (event) => {
                event.target.classList.toggle('selected');
            });

            textContentWrapper.appendChild(charSpan);
        });
    }

    textInput.addEventListener('input', renderTextUnits);

    if (textContentWrapper) {
        renderTextUnits();
    }


    // 3. 타이포그래피 컨트롤 기능 구현 (이전과 동일)
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
        
        // (이 함수는 다음 단계에서 수정될 예정입니다. 지금은 그대로 둡니다.)
        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontWeight = fontWeightSlider.value;

        textContentWrapper.style.letterSpacing = letterSpacing;
        textContentWrapper.style.lineHeight = lineHeight;
        textContentWrapper.style.fontSize = fontSize;
        textContentWrapper.style.fontWeight = fontWeight;

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

});
