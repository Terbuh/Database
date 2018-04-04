import './styles/styles.scss';

const port = 3000;
const usersURL = 'http://localhost:' + port + '/users';
const companiesURL = 'http://localhost:' + port + '/companies';
let usersList = [];
let companiesList = [];

const tableStart =
    '<table id="companiesTable" class="table table-hover">\n' +
    '  <thead class="thead-dark">\n' +
    '    <tr>\n' +
    '      <th scope="col">Index</th>\n' +
    '      <th scope="col">Company Name</th>\n' +
    '      <th scope="col">URI</th>\n' +
    '    </tr>\n' +
    '  </thead>\n' +
    '  <tbody>';

const tableEnd =
    '  </tbody>\n' +
    '</table>';

const hideRow = 'style="display:none"';

window.onload = () => {

  fetch(usersURL)

    .then(response => response.json()) // zmiana danych do jsona

    .then(userData => {

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

          for (let i = 0; i < companiesData.length; i++) {
            companiesList.push({
              name: companiesData[i].name,
              uri: companiesData[i].uri,
              users: new Array()
            });
          }

        })

        .then( () => {

          for (let i = 0; i < usersList.length; i++) {
            const userIndex = usersList[i].companyNumber;
            const userName = usersList[i].name;
            companiesList[userIndex].users.push(userName);
          }

          companiesList.sort((a, b) => {

            let firstUsers = a.users.length;
            let secondUsers = b.users.length;

            if ( firstUsers > secondUsers) {
              return -1;
            }

            else if ( firstUsers < secondUsers) {
              return 1;
            }

            return 0;

          });
        })

        .then(() => {

          let tableText = tableStart;

          for (let i = 0; i < companiesList.length; i++) {
            tableText +=
                  '<tr class="table-light">\n' +
                  '      <td>'+ i +'</td>\n' +
                  '      <td>'+ companiesList[i].name +'</td>\n' +
                  '      <td>'+ companiesList[i].uri +'</td>\n' +
                  '</tr>';

            if (companiesList[i].users.length > 0) {

              for(let j = 0; j < companiesList[i].users.length; j++) {
                let rowId = i + '.' + (j+1);
                tableText +=
                    '<tr id="' + rowId + '" class="table-active" ' + hideRow + '>\n' +
                    '    <td>' + rowId + '</td>\n' +
                    '    <td colspan="2">'+ companiesList[i].users[j] +'</td>\n' +
                    '</tr>\n';
              }

            }
          }

          tableText += tableEnd;
          document.getElementById('table').innerHTML = tableText;
          addRowEvents();

        });

    });

};

function addRowEvents() {

  let table = document.getElementById('companiesTable');
  let companyRows = table.getElementsByClassName('table-light');

  console.log('company rows = ' + companyRows.length + '\n');

  for (let i = 0; i < companyRows.length; i++) {

    let currentCompanyRow = companyRows[i];
    let toggleRowUsers = row => {
      return () => {
        let selectedRowIndex = row.getElementsByTagName('td')[0].innerHTML;
        let selectedRowUsers = companiesList[selectedRowIndex].users.length;

        for (let j = 0; j < selectedRowUsers; j++) {
          let childrenRowId = selectedRowIndex + '.' + (j+1);
          document.getElementById(childrenRowId).style.display = document.getElementById(childrenRowId).style.display == 'none' ? '' : 'none';
        }

      };
    };

    currentCompanyRow.onclick = toggleRowUsers(currentCompanyRow);
  }

}