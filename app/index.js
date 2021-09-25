// import './styles/styles.scss';

// window.onload = () => {
//   const heading = document.querySelector('.heading');
//   heading.textContent = 'It\'s working!';
// };
const container = document.querySelector('.users');
const container2 = document.querySelector('.companies');

const renderUsers = async () => {
    let uri = 'http://localhost:3000/users';

    const res = await fetch(uri);
    const users = await res.json();

    let template = '';
    users.forEach(user => {
        template += `
        <div class="user">
        <h2>Name: ${user.name}</h2>
        <p>Uri: ${user.uri}</p>
        <p>email: ${user.email}</p>
        <p>${user.uris}</p>
        <a href="/details.html"></a>
        </div>
        `
    })
container.innerHTML = template;

}

const renderCompanies = async () => {
    let uri = 'http://localhost:3000/companies';

    const res = await fetch(uri);
    const companies = await res.json();

    let template = '';
    companies.forEach(company => {
        template += `
        <div class="company">
        <h2>Name: ${company.name}</h2>
        <p>Uri: ${company.uri}</p>
        <a href="/details.html"></a>
        </div>
        `
    })
container2.innerHTML = template;

}

window.addEventListener('DOMContentLoaded', () => renderUsers());
window.addEventListener('DOMContentLoaded', () => renderCompanies());

