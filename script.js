const api_url = 'https://api.github.com/users/';
const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById('search')


function addInfoToCard(user) {
    const cardHTML = `
                <div class="card">
                    <div>
                    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
                    </div>
                    <div class="user-info">
                    <div class="user-desc">
                        <h2>${user.name}</h2>
                        <a href="${user.html_url}" target="_blank"><i class="fas fa-link"></i></a>
                    </div>
                    <p>${user.bio}</p>
                    <ul>
                        <li>${user.followers} <strong>Followers</strong></li>
                        <li>${user.following} <strong>Following</strong></li>
                        <li>${user.public_repos} <strong>Repos</strong></li>
                    </ul>
                    <div id="repos"></div>
                    </div>
                </div>
                `;
    main.innerHTML = cardHTML;
}

function addErrorToCard() {
    const cardHTML = `
                <div class="error-card">
                    <h1 style="color: #bbb">Github User doesn't exists.</h1>
                </div>
                `;
    main.innerHTML = cardHTML;
}

async function addReposToCard(userName) {
    const repos = await (await fetch(api_url + userName + '/repos')).json();
    const reposElement = document.getElementById('repos');
    repos.slice(0, 5).forEach(repo => {
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo')
        repoElement.href = repo.html_url
        repoElement.target = '_blank'
        repoElement.innerText = repo.name
        reposElement.appendChild(repoElement)
    })
}


async function getUser(userName) {
    const userData = await (await fetch(api_url + userName)).json();
    if (userData.message != "Not Found") {
        addInfoToCard(userData);
        addReposToCard(userName);
    } else {
        addErrorToCard();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const userName = search.value;
    if (userName) {
        getUser(userName);
        search.value = '';
    }
})