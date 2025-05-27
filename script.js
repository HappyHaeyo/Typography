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
    const textContentWrapper = document.getElementById('text-content-wrapper');

    if (textContentWrapper) {
        if (textInput.value === '') {
            textContentWrapper.textContent = '텍스트를 입력하세요';
        } else {
            textContentWrapper.textContent = textInput.value;
        }
    }

    textInput.addEventListener('input', () => {
        if (textContentWrapper) {
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

    const fontWeightSlider = document.getElementById('font-weight');
    const fontWeightValueSpan = document.getElementById('font-weight-value');

    function applyStyles() {
        if (!textContentWrapper) return;

        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontWeight = fontWeightSlider.value;

        textContentWrapper.style.letterSpacing = letterSpacing;
        textContentWrapper.style.lineHeight = lineHeight;
        textContentWrapper.style.fontSize = fontSize;
        textContentWrapper.style.fontWeight = fontWeight;
        // 폰트(서체)는 CSS에서 body에 Pretendard로 고정되었으므로 여기서는 설정하지 않습니다.

        // 슬라이더 값 표시 업데이트
        if (letterSpacingValueSpan) letterSpacingValueSpan.textContent = parseFloat(letterSpacingSlider.value).toFixed(2);
        if (lineHeightValueSpan) lineHeightValueSpan.textContent = parseFloat(lineHeightSlider.value).toFixed(1);
        if (fontSizeValueSpan) fontSizeValueSpan.textContent = fontSizeSlider.value;
        if (fontWeightValueSpan) fontWeightValueSpan.textContent = fontWeightSlider.value;
    }

    // 각 컨트롤에 이벤트 리스너 추가
    letterSpacingSlider.addEventListener('input', applyStyles);
    lineHeightSlider.addEventListener('input', applyStyles);
    fontSizeSlider.addEventListener('input', applyStyles);
    fontWeightSlider.addEventListener('input', applyStyles);


    // 페이지 로드 시 초기 스타일 적용 및 값 표시
    if (textContentWrapper) {
        applyStyles();
    }

});
