// Get references to all the input and output elements
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const weeklyHoursInput = document.getElementById("weeklyHours");
const plannedOtjtInput = document.getElementById("plannedOtjt");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

// Output fields are input elements
const durationDaysOutput = document.getElementById("durationDays");
const durationWeeksOutput = document.getElementById("durationWeeks");
const statutoryLeaveOutput = document.getElementById("statutoryLeave");
const totalDurationCalculationWeeksOutput = document.getElementById(
  "totalDurationCalculationWeeks"
);
const totalDurationCalculationHoursOutput = document.getElementById(
  "totalDurationCalculationHours"
);
const minOtjtRequiredOutput = document.getElementById("minOtjtRequired");

// Main function to perform all calculations and update the display
function calculateOtjt() {
  // Retrieve input values. Use `null` for dates if empty, `NaN` for numbers if empty/invalid.
  const startDate = startDateInput.value
    ? new Date(startDateInput.value)
    : null;
  const endDate = endDateInput.value ? new Date(endDateInput.value) : null;
  let weeklyHours = parseFloat(weeklyHoursInput.value);
  const plannedOtjt = parseFloat(plannedOtjtInput.value);

  // Clear previous outputs
  durationDaysOutput.value = "";
  durationWeeksOutput.value = "";
  statutoryLeaveOutput.value = "";
  totalDurationCalculationWeeksOutput.value = "";
  totalDurationCalculationHoursOutput.value = "";
  minOtjtRequiredOutput.value = "";
  finalOtjtOutput.value = ""; // Clear for initial validation check

  // --- Input Validation ---
  // Check if mandatory fields (startDate, endDate, weeklyHours) have valid values
  if (
    !startDateInput.value ||
    !endDateInput.value ||
    isNaN(weeklyHours) ||
    weeklyHours < 0
  ) {
      alert("Please fill in all mandatory fields (A, B, C) correctly.");
    // Clear any potentially lingering results from previous valid calculation
    durationDaysOutput.value = "";
    durationWeeksOutput.value = "";
    statutoryLeaveOutput.value = "";
    totalDurationCalculationWeeksOutput.value = "";
    totalDurationCalculationHoursOutput.value = "";
    minOtjtRequiredOutput.value = "";
    return; // Stop calculation if essential inputs are invalid
  }
}
