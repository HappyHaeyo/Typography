// DOM(Document Object Model) 요소들이 모두 로드된 후에 스크립트가 실행되도록 합니다.
document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현 (이전 단계에서 작성한 코드)
    // ... (생략 - 이전 코드와 동일) ...
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


    // 2. 텍스트 입력 기능 구현 (이전 단계에서 작성한 코드)
    // ... (생략 - 이전 코드와 동일) ...
    const textInput = document.getElementById('text-input');
    const patternDisplay = document.getElementById('pattern-display');

    if (textInput.value === '') {
        patternDisplay.textContent = '텍스트를 입력하세요';
    } else {
        patternDisplay.textContent = textInput.value;
    }

    textInput.addEventListener('input', () => {
        if (textInput.value === '') {
            patternDisplay.textContent = '텍스트를 입력하세요';
        } else {
            patternDisplay.textContent = textInput.value;
        }
    });


    // (이하 새로 추가되는 코드)
    // =================================
    // 3. 타이포그래피 컨트롤 기능 구현
    // =================================

    // 컨트롤 요소들 선택
    const letterSpacingSlider = document.getElementById('letter-spacing');
    const letterSpacingValueSpan = document.getElementById('letter-spacing-value');

    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValueSpan = document.getElementById('line-height-value');

    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValueSpan = document.getElementById('font-size-value');

    const fontFamilySelect = document.getElementById('font-family');
    const fontWeightSelect = document.getElementById('font-weight');

    // 모든 스타일을 한 번에 적용하는 함수
    function applyStyles() {
        if (!patternDisplay) return; // patternDisplay 요소가 없으면 함수 종료

        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontFamily = fontFamilySelect.value;
        const fontWeight = fontWeightSelect.value;

        patternDisplay.style.letterSpacing = letterSpacing;
        patternDisplay.style.lineHeight = lineHeight;
        patternDisplay.style.fontSize = fontSize;
        patternDisplay.style.fontFamily = fontFamily;
        patternDisplay.style.fontWeight = fontWeight;

        // 슬라이더 값 표시 업데이트
        if (letterSpacingValueSpan) letterSpacingValueSpan.textContent = parseFloat(letterSpacingSlider.value).toFixed(2) + 'em';
        if (lineHeightValueSpan) lineHeightValueSpan.textContent = parseFloat(lineHeightSlider.value).toFixed(1);
        if (fontSizeValueSpan) fontSizeValueSpan.textContent = fontSizeSlider.value + 'px';
    }

    // 각 컨트롤에 이벤트 리스너 추가
    letterSpacingSlider.addEventListener('input', applyStyles);
    lineHeightSlider.addEventListener('input', applyStyles);
    fontSizeSlider.addEventListener('input', applyStyles);
    fontFamilySelect.addEventListener('change', applyStyles); // select는 'change' 이벤트를 사용
    fontWeightSelect.addEventListener('change', applyStyles); // select는 'change' 이벤트를 사용

    // 페이지 로드 시 초기 스타일 적용 및 값 표시
    applyStyles();

}); // DOMContentLoaded 이벤트 리스너의 끝
