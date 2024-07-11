let tg = window.Telegram.WebApp;

const marketContent = '<button>Тест</button>';
const profileContent = '<h1>Профиль</h1>';
const infoContent = '<h6>Информация</h2>';

function changeContent(content) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = content;
}

document.getElementById('marketBtn').addEventListener('click', () => changeContent(marketContent));
document.getElementById('profileBtn').addEventListener('click', () => changeContent(profileContent));
document.getElementById('infoBtn').addEventListener('click', () => changeContent(infoContent));

changeContent(marketContent);

function setActiveTab(activeTabId) {
    const buttons = {
        marketBtn: document.getElementById('marketBtn'),
        profileBtn: document.getElementById('profileBtn'),
        infoBtn: document.getElementById('infoBtn')
    };

    for (const key in buttons) {
        buttons[key].disabled = false;
        buttons[key].style.background = '';
    }

    const activeButton = buttons[activeTabId];
    if (activeButton) {
        activeButton.disabled = true;
        activeButton.style.background = 'grey';
    }
}

document.getElementById('marketBtn').addEventListener('click', () => {
    changeContent(marketContent);
    setActiveTab('marketBtn');
});
document.getElementById('profileBtn').addEventListener('click', () => {
    changeContent(profileContent);
    setActiveTab('profileBtn');
});
document.getElementById('infoBtn').addEventListener('click', () => {
    changeContent(infoContent);
    setActiveTab('infoBtn');
});

setActiveTab('marketBtn');
