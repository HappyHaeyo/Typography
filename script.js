// DOM(Document Object Model) 요소들이 모두 로드된 후에 스크립트가 실행되도록 합니다.
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

    // 2. 텍스트 입력 기능 구현
    const textInput = document.getElementById('text-input');
    // const patternDisplay = document.getElementById('pattern-display'); // << 이 줄은 이제 직접 사용 안 함
    const textContentWrapper = document.getElementById('text-content-wrapper'); // <<< 새로 추가

    // patternDisplay 대신 textContentWrapper의 초기 텍스트를 설정합니다.
    if (textContentWrapper) { // textContentWrapper가 존재하는지 확인
        if (textInput.value === '') {
            textContentWrapper.textContent = '텍스트를 입력하세요';
        } else {
            textContentWrapper.textContent = textInput.value;
        }
    }

    textInput.addEventListener('input', () => {
        if (textContentWrapper) { // textContentWrapper가 존재하는지 확인
            if (textInput.value === '') {
                textContentWrapper.textContent = '텍스트를 입력하세요';
            } else {
                textContentWrapper.textContent = textInput.value;
            }
        }
    });

    // 3. 타이포그래피 컨트롤 기능 구현
    const letterSpacingSlider = document.getElementById('letter-spacing');
    const letterSpacingValueSpan = document.getElementById('letter-spacing-value');
    const lineHeightSlider = document.getElementById('line-height');
    const lineHeightValueSpan = document.getElementById('line-height-value');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValueSpan = document.getElementById('font-size-value');
    const fontFamilySelect = document.getElementById('font-family');
    const fontWeightSelect = document.getElementById('font-weight');

    function applyStyles() {
        // patternDisplay 대신 textContentWrapper에 스타일 적용
        if (!textContentWrapper) return; // textContentWrapper 요소가 없으면 함수 종료

        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontFamily = fontFamilySelect.value;
        const fontWeight = fontWeightSelect.value;

        textContentWrapper.style.letterSpacing = letterSpacing;
        textContentWrapper.style.lineHeight = lineHeight;
        textContentWrapper.style.fontSize = fontSize;
        textContentWrapper.style.fontFamily = fontFamily;
        textContentWrapper.style.fontWeight = fontWeight;

        // 슬라이더 값 표시 업데이트
        if (letterSpacingValueSpan) letterSpacingValueSpan.textContent = parseFloat(letterSpacingSlider.value).toFixed(2) + 'em';
        if (lineHeightValueSpan) lineHeightValueSpan.textContent = parseFloat(lineHeightSlider.value).toFixed(1);
        if (fontSizeValueSpan) fontSizeValueSpan.textContent = fontSizeSlider.value + 'px';
    }

    // 각 컨트롤에 이벤트 리스너 추가
    letterSpacingSlider.addEventListener('input', applyStyles);
    lineHeightSlider.addEventListener('input', applyStyles);
    fontSizeSlider.addEventListener('input', applyStyles);
    fontFamilySelect.addEventListener('change', applyStyles);
    fontWeightSelect.addEventListener('change', applyStyles);

    // 페이지 로드 시 초기 스타일 적용 및 값 표시
    if (textContentWrapper) { // textContentWrapper가 있을 때만 초기 스타일 적용
        applyStyles();
    }

});
