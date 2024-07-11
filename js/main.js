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