document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현 (정상 작동)
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

    // 2. 텍스트 렌더링 기능 (▼▼▼ 줄바꿈 오류 수정 ▼▼▼)
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
        
        // 글자를 하나씩 순회합니다.
        for (const char of text) {
            // 만약 글자가 줄바꿈 문자(\n)라면, <br> 태그를 추가합니다.
            if (char === '\n') {
                textContentWrapper.appendChild(document.createElement('br'));
            } else {
                // 그 외의 모든 글자는 span으로 감싸서 추가합니다.
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


    // 3. 타이포그래피 컨트롤 기능 구현 (▼▼▼ 컨트롤러 작동 오류 수정 ▼▼▼)
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

        // 슬라이더에서 현재 값들을 읽어옵니다.
        const letterSpacing = letterSpacingSlider.value + 'em';
        const lineHeight = lineHeightSlider.value;
        const fontSize = fontSizeSlider.value + 'px';
        const fontWeight = fontWeightSlider.value;

        // 'selected' 클래스를 가진 모든 글자(span)들을 가져옵니다.
        const selectedUnits = textContentWrapper.querySelectorAll('.editable-unit.selected');

        if (selectedUnits.length > 0) {
            // [선택된 글자가 있을 경우]: 선택된 각 글자에 대해 스타일을 적용합니다.
            selectedUnits.forEach(unit => {
                unit.style.letterSpacing = letterSpacing;
                unit.style.lineHeight = lineHeight;
                unit.style.fontSize = fontSize;
                unit.style.fontWeight = fontWeight;
            });
        } else {
            // [선택된 글자가 없을 경우]: 전체 텍스트 영역에 스타일을 적용합니다.
            textContentWrapper.style.letterSpacing = letterSpacing;
            textContentWrapper.style.lineHeight = lineHeight;
            textContentWrapper.style.fontSize = fontSize;
            textContentWrapper.style.fontWeight = fontWeight;
        }

        // 슬라이더 옆의 값 표시를 업데이트합니다.
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

    // 페이지 로드 시 초기 스타일 적용
    if (textContentWrapper) {
        applyStyles();
    }
});
