document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("jobApplicationForm");

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
                email: email
            };

            // Send data to Salesforce REST API
            fetch('https://delaware-12b-dev-ed.develop.my.salesforce.com/services/apexrest/SendJobApplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + '00DQy000006qNQz!AQEAQHrRbQfer6sm_5ArqUrWnkgmyfc5lDviKmdsUwbvnXOiOKApZFVUYXeKpxhRbuxWI9tggk_p3qcCkf8jRe88LuU8POvS' 
                },
                body: JSON.stringify(data)
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
