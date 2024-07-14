let tg = window.Telegram.WebApp;

Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user.id;
const userName = user.username;
const userPhotoUrl = user.photo_url;

fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: userId, username: userName, photo_url: userPhotoUrl })
  })
.then(response => response.json())
.then(data => {
    // Обновление баланса
    document.getElementById('userBalance').innerText = `Баланс: ${data.balance}`;
})
.catch(error => console.error('Ошибка:', error));

// Профиль
document.getElementById('profileBtn').addEventListener('click', () => {
document.getElementById('mainContent').innerHTML = `
    <div class="profile">
    <img src="${userPhotoUrl}" alt="Avatar" class="avatar">
    <h2>${userName}</h2>
    </div>
`;
});

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
