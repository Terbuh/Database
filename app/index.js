import './styles/styles.scss';

const port = 3000;
const usersURL = `http://localhost:${port}/users`;
const companiesURL = `http://localhost:${port}/companies`;
let usersList = [];
let companiesList = [];

const tableStart =
    `<table id="companiesTable" class="table table-hover">
       <thead class="thead-dark">
         <tr>
           <th scope="col">Index</th>
           <th scope="col">Company Name</th>
           <th scope="col">URI</th>
         </tr>
       </thead>
       <tbody>`;

const tableEnd =
    `  </tbody>
    </table>`;

window.onload = () => {
  fetch(usersURL)
    .then(response => response.json())
    .then(userData => {
      for (let i = 0; i < userData.length; i++) {
        usersList.push({
          name: userData[i].name,
          email: userData[i].email,
          companyUri: userData[i].uris && userData[i].uris.company,
          companyNumber: userData[i].uris.company && userData[i].uris.company.substring(11)
        });
      }

      fetch(companiesURL)
        .then(response => response.json())
        .then(companiesData => {
          for (let i = 0; i < companiesData.length; i++) {
            companiesList.push({
              name: companiesData[i].name,
              uri: companiesData[i].uri,
              users: []
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
            const firstUsers = a.users.length;
            const secondUsers = b.users.length;

            if (firstUsers > secondUsers) { return -1; }
            else if (firstUsers < secondUsers) { return 1; }
            return 0;
          });
        })

        .then(() => {
          let tableText = tableStart;
          for (let i = 0; i < companiesList.length; i++) {
            tableText +=
                  `<tr class="table-light">
                        <td>${i}</td>
                        <td>${companiesList[i].name}</td>
                        <td>${companiesList[i].uri}</td>
                   </tr>`;

            if (companiesList[i].users.length) {
              for (let j = 0; j < companiesList[i].users.length; j++) {
                let rowId = `${i}.${j+1}`;
                tableText +=
                    `<tr id="${rowId}" class="table-active ghost">
                        <td>${rowId}</td>
                        <td colspan="2">${companiesList[i].users[j]}</td>
                     </tr>`;
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

  for (let i = 0; i < companyRows.length; i++) {
    let currentCompanyRow = companyRows[i];
    let toggleRowUsers = row => {
      return () => {
        let selectedRowIndex = row.getElementsByTagName('td')[0].innerHTML;
        let selectedRowUsers = companiesList[selectedRowIndex].users.length;

        for (let j = 0; j < selectedRowUsers; j++) {
          let childrenRowId = `${selectedRowIndex}.${j+1}`;
          document.getElementById(childrenRowId).className = document.getElementById(childrenRowId).className === 'table-active ghost' ? 'table-active' : 'table-active ghost';
        }
      };
    };

    currentCompanyRow.onclick = toggleRowUsers(currentCompanyRow);
  }
}