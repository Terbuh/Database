const container = document.querySelector('.companies-and-its-users');

const renderCompaniesAndItsUsers = async () => {
  let uriCompanies = 'http://localhost:3000/companies';
  let uriUsers = 'http://localhost:3000/users';

  const resCompanies = await fetch(uriCompanies);
  const companies = await resCompanies.json();

  const resUsers = await fetch(uriUsers);
  const users = await resUsers.json();

  let template = '';
  companies.forEach(company => {
    template += `
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
  container.innerHTML = template;
}
renderCompaniesAndItsUsers();