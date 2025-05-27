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

    // 2. 텍스트를 "글자" 단위로 분리하고, 클릭 이벤트를 추가하는 기능 (이전과 동일)
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
        const characters = text.split('');
        characters.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'editable-unit';
            charSpan.textContent = char;
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


    // 3. 타이포그래피 컨트롤 기능 구현 (▼▼▼ 이 부분이 수정됨 ▼▼▼)
    const letterSpacingSlider = document.getElementById('letter-spacing');
    const letterSpacingValueSpan = document.getElementById('letter-spacing-value');
    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValueSpan = document.getElementById('line-height-value');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValueSpan = document.getElementById('font-size-value');
    const fontWeightSlider = document.getElementById('font-weight');
    const fontWeightValueSpan = document.getElementById('font-weight-value');

    // ▼▼▼ [핵심 변경점!] 스타일 적용 함수 로직 변경 ▼▼▼
    function applyStyles() {
        if (!textContentWrapper) return;

        // 1. 슬라이더에서 현재 값들을 읽어옵니다.
        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontWeight = fontWeightSlider.value;

        // 2. 행간(line-height)은 언제나 전체 텍스트 영역에 적용합니다.
        textContentWrapper.style.lineHeight = lineHeight;

        // 3. 현재 'selected' 클래스를 가진 모든 글자(span)들을 가져옵니다.
        const selectedUnits = textContentWrapper.querySelectorAll('.editable-unit.selected');

        // 4. 선택된 각 글자에 대해 개별 스타일(크기, 굵기, 자간)을 적용합니다.
        selectedUnits.forEach(unit => {
            unit.style.fontSize = fontSize;
            unit.style.fontWeight = fontWeight;
            unit.style.letterSpacing = letterSpacing;
        });

        // 5. 슬라이더 옆의 값 표시를 업데이트합니다 (이것은 항상 실행됩니다).
        if (letterSpacingValueSpan) letterSpacingValueSpan.textContent = parseFloat(letterSpacingSlider.value).toFixed(2);
        if (lineHeightValueSpan) lineHeightValueSpan.textContent = parseFloat(lineHeightSlider.value).toFixed(1);
        if (fontSizeValueSpan) fontSizeValueSpan.textContent = fontSizeSlider.value;
        if (fontWeightValueSpan) fontWeightValueSpan.textContent = fontWeightSlider.value;
    }

    // 각 컨트롤에 이벤트 리스너 추가 (이전과 동일)
    letterSpacingSlider.addEventListener('input', applyStyles);
    lineHeightSlider.addEventListener('input', applyStyles);
    fontSizeSlider.addEventListener('input', applyStyles);
    fontWeightSlider.addEventListener('input', applyStyles);

    // 페이지 로드 시 초기 스타일 적용 및 값 표시 (이전과 동일)
    if (textContentWrapper) {
        applyStyles();
    }
});
