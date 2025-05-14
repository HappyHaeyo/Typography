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

    // 초기 상태: 첫 번째 탭이 기본적으로 활성화되도록 설정 (HTML에서 이미 .active 클래스가 첫번째 버튼과 컨텐츠에 있다면 생략 가능)
    // 만약 HTML에 기본 active 클래스가 없다면 아래 코드로 첫번째 탭을 활성화 할 수 있습니다.
    // if (tabButtons.length > 0) {
    //     tabButtons[0].click(); // 첫 번째 탭 버튼을 프로그래매틱하게 클릭
    // }

}); // DOMContentLoaded 이벤트 리스너의 끝
