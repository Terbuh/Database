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
        });

    });





};
