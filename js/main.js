let tg = window.Telegram.WebApp;

Telegram.WebApp.ready();

const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user.id;
const userName = user.username;
let userPhotoUrl = user.photo_url || 'photo/standard_foto.png';

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
    userPhotoUrl = data.photo_url || 'photo/standard_foto.png';
    document.querySelector('.avatar').src = userPhotoUrl;
})
.catch(error => console.error('Ошибка:', error));

const profileContent = `
  <div class="profile">
    <img src="${userPhotoUrl}" alt="Avatar" class="avatar">
    <h2>${userName}</h2>
    <button class="change-photo-btn">Изменить фотку</button>
  </div>
`;

const marketContent = '<button>Тест</button>';
const infoContent = '<h6>Информация</h6>';

function changeContent(content) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = content;
    if (content.includes('change-photo-btn')) {
        document.querySelector('.change-photo-btn').addEventListener('click', openPhotoUrlModal);
    }
}

function openPhotoUrlModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Введите URL новой фотографии</h2>
            <input type="text" id="photoUrlInput" placeholder="URL фотографии">
            <button id="savePhotoUrlBtn">Сохранить</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    document.getElementById('savePhotoUrlBtn').addEventListener('click', () => {
        const newPhotoUrl = document.getElementById('photoUrlInput').value;
        if (newPhotoUrl) {
            fetch('/update-photo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId, photo_url: newPhotoUrl })
              })
            .then(response => response.json())
            .then(data => {
                userPhotoUrl = data.photo_url || 'photo/standard_foto.png';
                document.querySelector('.avatar').src = userPhotoUrl;
                document.body.removeChild(modal);
            })
            .catch(error => console.error('Ошибка:', error));
        }
    });
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
