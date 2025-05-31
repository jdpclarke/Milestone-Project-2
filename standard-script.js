document.addEventListener('DOMContentLoaded', function() {
  const standardSelect = document.getElementById('standard-select');
  const idInput = document.getElementById('id');
  const larsInput = document.getElementById('lars');
  const titleInput = document.getElementById('title');
  const nameInput = document.getElementById('name');
  const levelInput = document.getElementById('level');
  const fundingMaximumInput = document.getElementById('funding_maximum');
  const monthsInput = document.getElementById('months');
  const weeksInput = document.getElementById('weeks');

  // **** THE ONLY CHANGE IS THIS LINE ****
  fetch('assets/data-sources/standard.xml') // Updated path to your XML file
    .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
      const standards = xmlDoc.querySelectorAll('standard');

      standards.forEach(standard => {
        const id = standard.querySelector('id').textContent;
        const title = standard.querySelector('title').textContent;
        const option = document.createElement('option');
        option.value = id;
        option.textContent = title;
        standardSelect.appendChild(option);
      });

      standardSelect.addEventListener('change', function() {
        const selectedId = this.value;
        const selectedStandard = Array.from(standards).find(standard =>
          standard.querySelector('id') && standard.querySelector('id').textContent === selectedId
        );

        if (selectedStandard) {
          idInput.value = selectedStandard.querySelector('id').textContent;
          larsInput.value = selectedStandard.querySelector('lars').textContent;
          titleInput.value = selectedStandard.querySelector('title').textContent;
          nameInput.value = selectedStandard.querySelector('name').textContent;
          levelInput.value = selectedStandard.querySelector('level').textContent;
          fundingMaximumInput.value = selectedStandard.querySelector('funding_maximum').textContent;
          monthsInput.value = selectedStandard.querySelector('months').textContent;
          weeksInput.value = selectedStandard.querySelector('weeks').textContent;
        } else {
          // Clear all fields if no standard is selected (e.g., "-- Select a Standard --")
          idInput.value = '';
          larsInput.value = '';
          titleInput.value = '';
          nameInput.value = '';
          levelInput.value = '';
          fundingMaximumInput.value = '';
          monthsInput.value = '';
          weeksInput.value = '';
        }
      });
    })
    .catch(error => {
      console.error('Error fetching or parsing XML:', error);
      // You might want to display an error message to the user here as well
      alert('Failed to load apprenticeship standards. Please try again later.');
    });
});