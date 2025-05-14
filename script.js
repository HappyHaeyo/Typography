// DOM(Document Object Model) 요소들이 모두 로드된 후에 스크립트가 실행되도록 합니다.
document.addEventListener('DOMContentLoaded', () => {

    // 1. 탭 네비게이션 기능 구현
    // =================================
    const tabButtons = document.querySelectorAll('.tab-button'); // 모든 탭 버튼을 가져옵니다.
    const tabContents = document.querySelectorAll('.tab-content'); // 모든 탭 콘텐츠 영역을 가져옵니다.

    // 각 탭 버튼에 클릭 이벤트 리스너를 추가합니다.
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // data-tab 속성 값을 가져와서 어떤 콘텐츠를 보여줄지 결정합니다.
            const targetTabId = button.getAttribute('data-tab');

            // 모든 탭 버튼에서 'active' 클래스를 제거합니다.
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 탭 버튼에만 'active' 클래스를 추가합니다.
            button.classList.add('active');

            // 모든 탭 콘텐츠를 숨깁니다.
            tabContents.forEach(content => {
                content.classList.remove('active'); // 'active' 클래스를 제거하여 숨김 (CSS에서 .tab-content.active는 display:block 이므로)
            });

            // 목표하는 탭 콘텐츠만 보여줍니다.
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // =================================
    // 2. 텍스트 입력 기능 구현
    // =================================
    const textInput = document.getElementById('text-input'); // "텍스트 입력" 필드
    const patternDisplay = document.getElementById('pattern-display'); // 패턴이 표시될 영역

    // patternDisplay의 초기 텍스트를 설정합니다.
    if (textInput.value === '') {
        patternDisplay.textContent = '텍스트를 입력하세요'; // 또는 원하는 초기 안내 문구
    } else {
        patternDisplay.textContent = textInput.value;
    }

    // "텍스트 입력" 필드에 사용자가 입력할 때마다 이벤트가 발생합니다.
    textInput.addEventListener('input', () => {
        // 입력된 텍스트가 없으면 안내 문구를, 있으면 입력된 텍스트를 표시합니다.
        if (textInput.value === '') {
            patternDisplay.textContent = '텍스트를 입력하세요'; // 입력값이 없을 때 안내문구
        } else {
            patternDisplay.textContent = textInput.value; // 입력 필드의 현재 값을 patternDisplay에 텍스트로 설정
        }
    });

}); // DOMContentLoaded 이벤트 리스너의 끝 (이것이 파일의 유일한 닫는 괄호여야 합니다)
