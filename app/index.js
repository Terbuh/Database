import './styles/styles.scss';

const port = 3000;
const usersURL = 'http://localhost:' + port + '/users';
const companiesURL = 'http://localhost:' + port + '/companies';

let usersList = [];
let companiesList = [];

window.onload = () => {

  fetch(usersURL)
    .then(response => response.json()) // zmiana danych do jsona
    .then(userData => {
      console.log('#Full user data: ', userData);
      for (let i = 0; i < userData.length; i++) {
        usersList.push({
          name: userData[i].name,
          email: userData[i].email,
          companyUri: userData[i].uris.company,
          companyNumber: userData[i].uris.company.substring(11)
        });
      }

      fetch(companiesURL)
        .then(response => response.json())
        .then(companiesData => {
          console.log('#Full companies data: ', companiesData);
          for (let i = 0; i < companiesData.length; i++) {
            companiesList.push({
              name: companiesData[i].name,
              uri: companiesData[i].uri,
              users: new Array()
            });
          }

        })
        .then(() => {
          for(let i = 0; i < usersList.length; i++) {
            const userIndex = usersList[i].companyNumber;
            const userName = usersList[i].name;
            companiesList[userIndex].users.push(userName);
          }
          console.log('#Test Company' + 124 + ':', companiesList[124]);
        })
        .then(() => {
          let tableText = '<table class="table">\n' +
                '  <thead>\n' +
                '    <tr>\n' +
                '      <th scope="col">Index</th>\n' +
                '      <th scope="col">Company Name</th>\n' +
                '      <th scope="col">URI</th>\n' +
                '      <th scope="col">Users</th>\n' +
                '    </tr>\n' +
                '  </thead>\n' +
                '  <tbody>';

          for(let i = 0; i < companiesList.length; i++) {
            tableText = tableText +
                  '<tr>\n' +
                  '      <th scope="row">'+ i +'</th>\n' +
                  '      <td>'+ companiesList[i].name +'</td>\n' +
                  '      <td>'+ companiesList[i].uri +'</td>\n' +
                  '      <td>'+ companiesList[i].users +'</td>\n' +
                  '</tr>';
          }

          tableText = tableText + '</tbody>\n' + '</table>';
          document.getElementById('table').innerHTML = tableText;

        });

    });





};
