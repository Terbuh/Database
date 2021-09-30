const container3 = document.querySelector('.companies-and-its-users');

async function getUsers() {
    let url = 'http://localhost:3000/users';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getCompanies() {
    let url = 'http://localhost:3000/companies';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

const renderCompaniesAndItsUsers = async () => {
    let users = await getUsers();
    let companies = await getCompanies();

    let template = '';
    companies.forEach(company => {
        template +=`
                <table class="company">
                <th>Name: ${company.name}</th>
                 </table>`
        
        users.forEach(user => {
            if ( company.uri === user.uris.company ) {
                template += `
                  <table class="user">
                  <td>Name: ${user.name},</td>
                  <td>email: ${user.email}</td>
                  </table>`
            }
        })
    })
    container3.innerHTML = template;
}
renderCompaniesAndItsUsers();