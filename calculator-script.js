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
  // --- Rule for Weekly Working Hours (C): Cap at 30 if start is on or after 1 August 2022 ---
  // Use UTC for date comparison to avoid local timezone issues
  const august2022 = new Date("2022-08-01T00:00:00Z");
  if (startDate >= august2022 && weeklyHours > 30) {
    weeklyHours = 30; // Cap the value used for calculation
    // Optionally, update the input field to show the capped value
    weeklyHoursInput.value = 30;
  }
  // --- D. Planned apprenticeship duration (in days) (B-A) ---
  // Calculate difference in milliseconds, then convert to days.
  // Using Math.ceil to ensure the end day is fully counted.
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const plannedDurationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // --- E. Planned apprenticeship duration (in weeks) (B-A) ---
  // Note 1: rounded to a full number (e.g if 52.4 -> 52; 52.6 -> 53)
  const plannedDurationWeeks = Math.round(plannedDurationDays / 7);

  // --- F. Statutory leave duration (in weeks) (auto-calculates based on duration) ---
  // Assuming 5.6 weeks statutory leave for a full year (52 weeks).
  // Calculate proportionally based on plannedDurationWeeks.
  const statutoryLeaveWeeks = (plannedDurationWeeks / 52) * 5.6;

  // --- G. Total apprenticeship duration for calculation (E-F) (in weeks) ---
  // Ensure duration does not go below zero
  let totalDurationCalculationWeeks =
    plannedDurationWeeks - statutoryLeaveWeeks;
  if (totalDurationCalculationWeeks < 0) {
    totalDurationCalculationWeeks = 0;
  }

  // --- H. Total apprenticeship duration for calculation (C*G) (in hours) ---
  const totalDurationCalculationHours =
    weeklyHours * totalDurationCalculationWeeks;

  // --- I. Minimum off-the-job training required (H x 20%) (in hours) ---
  const minOtjtRequired = totalDurationCalculationHours * 0.2;

  // --- Update Display ---
  // Use toFixed() for consistent decimal places - setting 'value' for input fields
  durationDaysOutput.value = plannedDurationDays.toFixed(0); // No decimals for days
  durationWeeksOutput.value = plannedDurationWeeks.toFixed(0); // No decimals for rounded weeks
  statutoryLeaveOutput.value = statutoryLeaveWeeks.toFixed(2);
  totalDurationCalculationWeeksOutput.value =
    totalDurationCalculationWeeks.toFixed(2);
  totalDurationCalculationHoursOutput.value =
    totalDurationCalculationHours.toFixed(2);
  minOtjtRequiredOutput.value = minOtjtRequired.toFixed(2);
}

// Function to reset the calculator
        function resetCalculator() {
            // Clear input fields
            startDateInput.value = '';
            endDateInput.value = '';
            weeklyHoursInput.value = '';
            plannedOtjtInput.value = '';

            // Clear output fields - setting 'value' for input fields
            durationDaysOutput.value = '';
            durationWeeksOutput.value = '';
            statutoryLeaveOutput.value = '';
            totalDurationCalculationWeeksOutput.value = '';
            totalDurationCalculationHoursOutput.value = '';
            minOtjtRequiredOutput.value = '';
            finalOtjtOutput.value = 'Enter details above'; // Reset to initial message
        }
