import './styles/styles.scss';
/*exported toggleUsers */
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

const hideRow = 'style="display: none"';

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

          for(let i = 0; i < usersList.length; i++) {
            const userIndex = usersList[i].companyNumber;
            const userName = usersList[i].name;
            companiesList[userIndex].users.push(userName);
          }
        })

        .then(() => {

          let tableText = tableStart;

          for(let i = 0; i < companiesList.length; i++) {
            tableText +=
                  '<tr >\n' +
                  '      <td>'+ i +'</td>\n' +
                  '      <td>'+ companiesList[i].name +'</td>\n' +
                  '      <td>'+ companiesList[i].uri +'</td>\n' +
                  '</tr>';

            if(companiesList[i].users.length > 0) {

              for(let j = 0; j < companiesList[i].users.length; j++) {
                tableText +=
                    '<tr class="table-active" ' + hideRow + '>\n' +
                    '    <td>' + i + '.' + (j+1) +  '</td>\n' +
                    '    <td colspan="2">'+ companiesList[i].users[j] +'</td>\n' +
                    '</tr>\n';
              }

            }
          }

          tableText += tableEnd;
          document.getElementById('table').innerHTML = tableText;
          addRowHandlers();

        });

    });



};

function addRowHandlers() {

  let table = document.getElementById('companiesTable');
  let rows = table.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    let currentRow = table.rows[i];
    let createClickHandler = row => {
      return () => {
        let cell = row.getElementsByTagName('td')[0];
        let id = cell.innerHTML;
        alert('id:' + id);
      };
    };

    currentRow.onclick = createClickHandler(currentRow);
  }

}