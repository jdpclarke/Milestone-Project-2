/*jslint browser: true */
/*global alert */

// Get references to all the input and output elements
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const weeklyHoursInput = document.getElementById("weeklyHours");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

// Output fields are input elements
const durationDaysOutput = document.getElementById("durationdays");
const durationWeeksOutput = document.getElementById("durationweeks");
const statutoryLeaveOutput = document.getElementById("statutoryLeave");
const totalDurationCalculationWeeksOutput = document.getElementById("totalDurationCalculationWeeks");
const totalDurationCalculationHoursOutput = document.getElementById("totalDurationCalculationHours");
const minOtjtRequiredOutput = document.getElementById("minOtjtRequired");


// Helper function to clear all output fields
function clearOutputFields() {
    durationDaysOutput.value = "";
    durationWeeksOutput.value = "";
    statutoryLeaveOutput.value = "";
    totalDurationCalculationWeeksOutput.value = "";
    totalDurationCalculationHoursOutput.value = "";
    minOtjtRequiredOutput.value = "";
}

// Main function to perform all calculations and update the display
function calculateOtjt() {
    // Clear previous outputs before validation
    clearOutputFields();

    // Initialize an array to store error messages
    let errors = [];

    // --- Input Validation ---
    // Check if mandatory input fields are empty
    if (!startDateInput.value) {
        errors.push("Please enter a start date (A).");
    }
    if (!endDateInput.value) {
        errors.push("Please enter an end date (B).");
    }

    // Parse dates *after* checking for emptiness,
    // so we can then check their validity
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Check if parsed dates are valid
    // (only if a value was provided in the first place)
    if (startDateInput.value && Number.isNaN(startDate.getTime())) {
        errors.push("The start date (A) you entered is not a valid date. " + "Please check the format or value.");
    }
    if (endDateInput.value && Number.isNaN(endDate.getTime())) {
        errors.push("The end date (B) you entered is not a valid date. " + "Please check the format or value.");
    }

    // Parse weekly hours and validate
    let weeklyHours = parseFloat(weeklyHoursInput.value);
    if (Number.isNaN(weeklyHours) || weeklyHours <= 0) {
        errors.push("Please enter valid weekly working hours " + "(C) greater than 0.");
    }

    // If there are any errors,
    // display them all in one alert and stop the function
    if (errors.length > 0) {
        alert("Please correct the following issues:\n\n" + errors.join("\n"));
        return; // Stop calculation if there are errors
    }

    // --- Rule for Weekly Working Hours (C): Cap at 30 if start is on or after
    //     1 August 2022 ---
    // Use UTC for date comparison to avoid local timezone issues
    const august2022 = new Date("2022-08-01T00:00:00Z");
    if (startDate >= august2022 && weeklyHours > 30) {
        weeklyHours = 30; // Cap the value used for calculation
        weeklyHoursInput.value = 30; // Update the input field visually
    }

    // --- D. Planned apprenticeship duration (in days) (B-A) ---
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const plannedDurationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // --- E. Planned apprenticeship duration (in weeks) (B-A) ---
    const plannedDurationWeeks = Math.round(plannedDurationDays / 7);

    // --- F. Statutory leave duration in weeks (auto-calculates based on
    //     duration) ---
    const statutoryLeaveWeeks = (plannedDurationWeeks / 52) * 5.6;

    // --- G. Total apprenticeship duration for calculation (E-F) (in weeks) ---
    let totalDurationCalculationWeeks = plannedDurationWeeks - statutoryLeaveWeeks;
    if (totalDurationCalculationWeeks < 0) {
        totalDurationCalculationWeeks = 0;
    }

    // --- H. Total apprenticeship duration for calculation (C*G) (in hours) ---
    const totalDurationCalculationHours = weeklyHours * totalDurationCalculationWeeks;

    // --- I. Minimum off-the-job training required (H x 20%) (in hours) ---
    const minOtjtRequired = totalDurationCalculationHours * 0.20;

    // --- Update Display ---
    durationDaysOutput.value = plannedDurationDays.toFixed(0);
    durationWeeksOutput.value = plannedDurationWeeks.toFixed(0);
    statutoryLeaveOutput.value = statutoryLeaveWeeks.toFixed(1);
    totalDurationCalculationWeeksOutput.value = totalDurationCalculationWeeks.toFixed(1);
    totalDurationCalculationHoursOutput.value = totalDurationCalculationHours.toFixed(0);
    // Rounded to the nearest whole number here:
    minOtjtRequiredOutput.value = minOtjtRequired.toFixed(0);
}

// Function to reset the calculator
function resetCalculator() {
    // Clear input fields
    startDateInput.value = "";
    endDateInput.value = "";
    weeklyHoursInput.value = "";

    // Clear all output fields
    clearOutputFields();
}

// --- Event Listeners ---
// Trigger calculation when the calculate button is clicked
calculateBtn.addEventListener("click", calculateOtjt);

// Add event listener for the reset button
resetBtn.addEventListener("click", resetCalculator);

// Perform an initial reset when the page loads to ensure clean state
window.onload = resetCalculator;