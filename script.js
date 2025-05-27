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

    // 2. 텍스트를 단어 단위로 분리하고, 클릭 이벤트를 추가하는 기능 (▼▼▼ 이 부분이 수정됨 ▼▼▼)
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

        const units = text.split(/(\s+)/);

        units.forEach(unit => {
            if (unit.trim().length > 0) {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'editable-unit';
                wordSpan.textContent = unit;

                // ▼▼▼ [새로 추가된 핵심 로직!] 클릭 이벤트 리스너 추가 ▼▼▼
                wordSpan.addEventListener('click', (event) => {
                    // 클릭된 요소의 'selected' 클래스를 토글(toggle)합니다.
                    // 클래스가 없으면 추가하고, 있으면 제거합니다.
                    event.target.classList.toggle('selected');
                });
                // ▲▲▲ [새로 추가된 핵심 로직!] ▲▲▲

                textContentWrapper.appendChild(wordSpan);
            } else {
                textContentWrapper.appendChild(document.createTextNode(unit));
            }
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
        
        // (이 함수는 다음 2-3단계에서 수정될 예정입니다. 지금은 그대로 둡니다.)
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
