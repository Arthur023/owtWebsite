document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("jobApplicationForm");
    var selectElement = document.getElementById("jobSelect");
    var jobOppId;

    // Event listener to capture selected job ID
    selectElement.addEventListener("change", function(event) {
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        jobOppId = selectedOption.id;
        console.log("Selected job ID:", jobOppId);
    });
    // Function to create list items for each job
    function createJobListItem(job) {
        var listItem = document.createElement('option');
        listItem.textContent = job.name;
        listItem.id = job.id;
        return listItem;
    }

    // Fetch data from Salesforce REST API using GET method when the page loads
    fetch('https://delaware-12b-dev-ed.develop.my.salesforce.com/services/apexrest/SendJobApplication', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + '00DQy000006qNQz!AQEAQHrRbQfer6sm_5ArqUrWnkgmyfc5lDviKmdsUwbvnXOiOKApZFVUYXeKpxhRbuxWI9tggk_p3qcCkf8jRe88LuU8POvS' 
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(responseData => {
        console.log('Data retrieved successfully:', responseData);
        // Clear previous job list items
        selectElement.innerHTML = '';
        var noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        noneOption.setAttribute('value', ''); // Empty value for the "None" option
        selectElement.appendChild(noneOption);

        // Create list items for each job and append them to the job list
        responseData.forEach(job => {
            var listItem = createJobListItem(job);
            selectElement.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error retrieving data:', error);
        // Display an error message to the user or handle the error
    });


    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get access token when the form is submitted
        // getAccessToken().then(accessToken => {
            // Get form data
            var formData = new FormData(form);
            
            // Validate email and last name fields
            var email = formData.get('email');
            var lastName = formData.get('last_name');
            if (!email || !lastName) {
                alert("Please fill in all required fields.");
                return; // Stop form submission if validation fails
            }

            // Validate email format
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return; // Stop form submission if validation fails
            }
            
            // Prepare data for sending to Salesforce REST API
            var data = {
                first_name: formData.get('first_name'),
                last_name: lastName,
                email: email,
                jobOppId: jobOppId
            };
        
            // Wrap the data in the required JSON structure
            var requestData = {
                newJsonJobApplication: data
            };
        console.log('requestData: ', requestData);

            // Send data to Salesforce REST API
            fetch('https://delaware-12b-dev-ed.develop.my.salesforce.com/services/apexrest/SendJobApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + '00DQy000006qNQz!AQEAQHrRbQfer6sm_5ArqUrWnkgmyfc5lDviKmdsUwbvnXOiOKApZFVUYXeKpxhRbuxWI9tggk_p3qcCkf8jRe88LuU8POvS' 
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data sent successfully:', data);
                // Optionally, you can display a success message to the user
                alert('Your application has been submitted successfully!');
            })
            .catch(error => {
                console.error('Error sending data:', error);
                // Display an error message to the user
                alert('There was an error submitting your application. Please try again later.');
            });
        // });
    });
});
