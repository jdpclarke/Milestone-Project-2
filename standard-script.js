document.addEventListener("DOMContentLoaded", function () {
  const standardSelect = document.getElementById("standard-select");
  const idInput = document.getElementById("id");
  const larsInput = document.getElementById("lars");
  const nameInput = document.getElementById("name");
  const levelInput = document.getElementById("level");
  const fundingMaximumInput = document.getElementById("funding_maximum");
  const monthsInput = document.getElementById("months");
  const weeksInput = document.getElementById("weeks");

  fetch("assets/data-sources/standard.xml")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((xmlString) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");
      let standards = xmlDoc.querySelectorAll("standard"); // Use 'let' because we'll reassign

      // Convert NodeList to an array and sort it by 'lars' value
      standards = Array.from(standards).sort((a, b) => {
        const larsA = parseInt(a.querySelector("lars").textContent, 10);
        const larsB = parseInt(b.querySelector("lars").textContent, 10);
        return larsA - larsB; // Sorts numerically in ascending order
      });

      standards.forEach((standard) => {
        const id = standard.querySelector("id").textContent;
        const title = standard.querySelector("title").textContent;
        const option = document.createElement("option");
        option.value = id;
        option.textContent = title;
        standardSelect.appendChild(option);
      });

      standardSelect.addEventListener("change", function () {
        const selectedId = this.value;
        const selectedStandard = Array.from(standards).find(
          (standard) =>
            standard.querySelector("id") &&
            standard.querySelector("id").textContent === selectedId
        );

        if (selectedStandard) {
          idInput.value = selectedStandard.querySelector("id").textContent;
          larsInput.value = selectedStandard.querySelector("lars").textContent;
          nameInput.value = selectedStandard.querySelector("name").textContent;
          levelInput.value =
            selectedStandard.querySelector("level").textContent;
          fundingMaximumInput.value =
            selectedStandard.querySelector("funding_maximum").textContent;
          monthsInput.value =
            selectedStandard.querySelector("months").textContent;
          weeksInput.value =
            selectedStandard.querySelector("weeks").textContent;
        } else {
          idInput.value = "";
          larsInput.value = "";
          nameInput.value = "";
          levelInput.value = "";
          fundingMaximumInput.value = "";
          monthsInput.value = "";
          weeksInput.value = "";
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching or parsing XML:", error);
      alert("Failed to load apprenticeship standards. Please try again later.");
    });
});
