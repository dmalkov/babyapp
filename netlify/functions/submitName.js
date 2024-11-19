<script>
  async function submitName() {
    const name = document.getElementById("nameInput").value;
    const familyName = document.getElementById("familySelect").value;

    if (name && familyName) {
      // Define the API endpoint
      const apiUrl = 'https://your-netlify-site.netlify.app/.netlify/functions/submitName';

      // Prepare the data to be sent
      const requestData = {
        firstName: name,
        familyName: familyName
      };

      // Send a POST request to the serverless function
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok) {
          const result = await response.json();
          document.getElementById("responseMessage").innerText = `Thank you, ${name} ${familyName}, for submitting!`;
          document.getElementById("nameInput").value = ""; // Clear the input box
          document.getElementById("familySelect").value = ""; // Clear the dropdown
        } else {
          throw new Error('Failed to save the name.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error saving the name. Please try again.');
      }
    } else {
      alert("Please enter a first name and select a last name.");
    }
  }
</script>
