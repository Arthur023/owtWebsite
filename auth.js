const accessToken = '00DQy000006qNQz!AQEAQHrRbQfer6sm_5ArqUrWnkgmyfc5lDviKmdsUwbvnXOiOKApZFVUYXeKpxhRbuxWI9tggk_p3qcCkf8jRe88LuU8POvS' 

// Function to get the accessToken dynamically. 
// I didn't do it this way because then everybody would have access to the login credentials. 
// But normally this is the way.

// function getAccessToken() {
//     var clientId = 'XXX';
//     var clientSecret = 'XXX';
//     var username = 'vandeveldearthur+integration@gmail.com';
//     var password = 'XXX';
//     var securityToken = 'XXX';
//     var tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token';
//     // var tokenEndpoint = 'https://delaware-12b-dev-ed.develop.my.salesforce.com/services/oauth2/token';
//     // var tokenEndpoint = 'https://sfdc-cors.herokuapp.com/services/oauth2/token'
//     var grantType = 'password';

//     var requestBody = 'grant_type=' + encodeURIComponent(grantType) +
//                       '&client_id=' + encodeURIComponent(clientId) +
//                       '&client_secret=' + encodeURIComponent(clientSecret) +
//                       '&username=' + encodeURIComponent(username) +
//                       '&password=' + encodeURIComponent(password + securityToken);

//     return fetch(tokenEndpoint, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: requestBody
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to obtain access token');
//         }
//         return response.json();
//     })
//     .then(data => {
//         return data.access_token;
//     });
// }

