# ApprentiCalc - Milestone Project 2

**A website providing a user friendly Minimum Off-The-Job Hours (MinimumOTJH) calculator for apprenticeship standards as per the Insitute for Apprenticeships and Technical Education (IfATE) website and databse.**

## 1. Overview

Confused about minimum On-The-Job (OTJ) hours for your apprenticeship? ApprentiCalc is a simple and intuitive tool designed to quickly calculate the required minimum OTJ hours, helping apprentices and employers easily understand and track progress.

Navigating the requirements for apprenticeship On-The-Job (OTJ) hours can often feel complex and confusing. ApprentiCalc is designed to cut through the complexity and provide a clear, straightforward solution for both apprentices and employers. This intuitive online tool empowers users to quickly and accurately calculate the minimum OTJ hours mandated for their specific apprenticeship programme. By simplifying this crucial aspect of apprenticeship planning and management, ApprentiCalc helps ensure compliance with regulations and provides a transparent framework for tracking progress.

Whether you're an apprentice eager to understand your learning journey and milestones, or an employer striving to effectively manage and mentor your apprentices, ApprentiCalc offers a user-friendly platform to obtain the essential OTJ figures you need, saving you time and reducing the potential for errors.

## 2. Rationale

ApprentiCalc is an online tool developed to provide a straightforward and efficient means of calculating the minimum On-The-Job (OTJ) hours required for various apprenticeship programmes. Its primary objective is to simplify the process of understanding and determining these essential training requirements for both apprentices and employers.

The inspiration for ApprentiCalc arose from observing the often confusing and time-consuming nature of deciphering apprenticeship OTJ guidelines. Many individuals and organisations struggle to readily access and accurately calculate these figures, leading to potential misunderstandings, administrative burdens, and even non-compliance. This project aims to address this gap by providing a user-friendly and readily accessible solution.

Apprenticeships are a vital pathway for skills development and workforce training. A key component of any apprenticeship is the mandated On-The-Job training, which ensures practical experience alongside theoretical learning. However, the specific minimum hours required can vary significantly depending on the sector, level, and governing body of the apprenticeship. This variability often necessitates careful review of complex documentation and manual calculations, which can be prone to error and inefficient.

The core problem that ApprentiCalc seeks to resolve is the difficulty and inefficiency associated with determining the minimum required On-The-Job training hours for apprenticeships. This can lead to wasted time for administrators, potential misinterpretations of regulations, and uncertainty for apprentices regarding their training progress.

ApprentiCalc offers a user-friendly online platform where users can input relevant details about their apprenticeship (e.g., sector, level, duration). The tool will then automatically calculate and display the minimum required OTJ hours based on pre-loaded or easily configurable parameters. Key features include an intuitive interface, clear presentation of results, and the potential for future integration of specific apprenticeship frameworks. This approach provides a unique and accessible alternative to manual calculations and sifting through lengthy documents.

ApprentiCalc offers several advantages over current methods. It provides a significant time-saving for administrators and apprentices alike. The automated calculations reduce the risk of human error, ensuring greater accuracy and compliance. Furthermore, the clear and accessible output empowers apprentices to better understand their training requirements and track their progress effectively. For employers, it streamlines the management of apprenticeship programmes and aids in ensuring adherence to regulatory standards.

The initial scope of ApprentiCalc focuses on providing accurate calculations for a range of common apprenticeship frameworks. Acknowledged limitations include the need for ongoing updates to reflect changes in regulations and the potential initial focus on specific sectors. Potential future enhancements for ApprentiCalc include the integration of progress tracking features, the ability to save and export calculations, the inclusion of links to relevant regulatory documents, and the expansion to cover a wider range of apprenticeship frameworks and regions.

In summary, ApprentiCalc addresses a significant need by providing a user-friendly and accurate solution for calculating minimum apprenticeship On-The-Job training hours. By simplifying this process, the tool has the potential to save time, reduce errors, improve understanding, and ultimately contribute to the more effective management and successful completion of apprenticeships.

## 3. User Experience (UX)

### User Stories

#### Feature 1: Apprenticeship Standard Lookup & Display

**As an ApprentiCalc user,** I want to select an apprenticeship standard from a dynamic list so that I can immediately view its essential details like LARS number, funding, and duration, informing my understanding of the program.

**Acceptance Criteria:**

- A dropdown menu is present that lists available apprenticeship standards.
- The dropdown options are dynamically populated from an external data source (e.g., `standard.xml`).
- The options in the dropdown are sorted numerically by their LARS value for easy navigation.
- Upon selecting an option, key details of that standard (e.g., ID, LARS Number, Title, Name, Level, Maximum Funding, Duration in Months, Duration in Weeks) are automatically displayed in read-only input fields.
- The displayed details accurately reflect the selected standard's data.
- The detail fields are arranged clearly (e.g., side-by-side on larger screens, stacked on smaller screens).

**Tasks:**

- Develop JavaScript to asynchronously fetch and parse the `standard.xml` file.
- Implement JavaScript to dynamically populate the dropdown (`<select>`) element with standard titles (display) and IDs (value), ensuring sorting by LARS.
- Create HTML structure for the dropdown and the read-only input fields that will display standard details.
- Implement a JavaScript event listener on the dropdown's `change` event to retrieve the selected standard's data and populate the detail fields.
- Apply CSS (e.g., Bootstrap grid system) to arrange the detail fields responsively.
- Ensure proper error handling if the XML data cannot be loaded.

#### Feature 2: Accurate OTJ Hour Calculation

**As an apprentice or employer,** I want to accurately calculate the minimum On-The-Job (OTJ) training hours required for an apprenticeship so that I can ensure compliance and effective planning.

**Acceptance Criteria:**

- The tool calculates the duration of the practical period (A to B) in days.
- The tool calculates the duration of the practical period (A to B) in weeks, rounded to the nearest whole number.
- The tool accurately calculates the statutory leave duration (F) based on the planned apprenticeship duration.
- The tool correctly calculates the total apprenticeship duration for calculation (G) in weeks, excluding statutory leave.
- The tool correctly calculates the total apprenticeship duration for calculation (H) in hours, applying a 30-hour cap for apprenticeships starting on or after 1 August 2022.
- The tool accurately calculates the minimum off-the-job training required (I) as 20% of the total apprenticeship duration for calculation in hours, rounded to a whole number.

**Tasks:**

- Implement date difference calculation for days (D) and weeks (E).
- Develop the statutory leave calculation logic (F).
- Implement the total duration for calculation in weeks (G).
- Implement the total duration for calculation in hours, including the 30-hour cap logic (H).
- Implement the final 20% OTJ calculation and rounding for Field I.
- Conduct unit tests for all calculation formulas with various inputs (including edge cases like short durations, exactly 52 weeks, dates around Aug 1, 2022).

#### Feature 3: Immediate Input Validation and Feedback

**As a user,** I want clear and immediate alerts if I miss mandatory input fields or enter invalid data, so that I can quickly correct my entries and successfully get a calculation.

**Acceptance Criteria:**

- An alert is displayed if the "Practical period start date (A)" field is empty.
- An alert is displayed if the "Practical period end date (B)" field is empty.
- An alert is displayed if "Weekly working hours (C)" is empty, not a number, or less than or equal to zero.
- An alert is displayed if a provided date for A or B is not a valid date (e.g., "2023-02-30").
- If multiple input issues exist, all relevant error messages are displayed simultaneously in a single alert.
- Calculations do not proceed until all mandatory fields are valid.

**Tasks:**

- Implement JavaScript checks for empty date fields (A, B).
- Implement JavaScript checks for invalid numerical input in weekly hours (C).
- Implement JavaScript checks for "Invalid Date" objects after parsing date inputs.
- Modify the validation logic to collect all error messages into an array and display them collectively.
- Ensure the calculation function returns immediately if any validation errors are present.

#### Feature 4: Clear Calculation Breakdown Display

**As a user,** I want to see a clear breakdown of each step of the OTJ hour calculation (D through H) and the final result (I) so that I can understand how the figures are derived.

**Acceptance Criteria:**

- Each calculation step (D, E, F, G, H, I) is displayed in a dedicated, clearly labelled output field.
- The output fields are read-only to prevent user modification.
- The display for "Minimum off-the-job training required (I)" has a distinct visual style (e.g., different background color) to highlight it as the primary result.
- Numerical outputs are formatted consistently (e.g., days/weeks as whole numbers where appropriate, hours/weeks as two decimal places where needed for precision).

**Tasks:**

- Ensure all output fields (D-I) are correctly associated with their respective calculation results.
- Verify that output fields are set to `readonly` in HTML.
- Apply the specified CSS styling to the 'I' field.
- Review and ensure appropriate `toFixed()` or `Math.round()` methods are applied for display formatting.

#### Feature 5: Easy Reset Functionality

**As a user,** I want a prominent "Reset" button that clears all input and output fields, so that I can easily start a new calculation without manually deleting previous entries.

**Acceptance Criteria:**

- A "Reset" button is clearly visible and clickable on the page.
- Clicking the "Reset" button clears the values from all input fields (A, B, C).
- Clicking the "Reset" button clears the values from all calculated output fields (D-I).
- The page loads with all input and output fields cleared by default.

**Tasks:**

- Implement the `resetCalculator` JavaScript function to clear all relevant input and output field values.
- Attach an event listener to the "Reset" button to call `resetCalculator` on click.
- Configure `window.onload` to call `resetCalculator` for initial page state.

### Design

- **Colour Scheme**

  As the project is based around apprenticeships and OTJ Calculations, the colours have been based on the Insitute for Apprenticeships and Technical Education (IfATE) logo. The below colour palette was generated from the IfATE logo using [IMAGECOLORPICKER.com](https://imagecolorpicker.com/)

  ![Colour palette for this project](assets/readme/colour-palette.png)

- **Typography**

  The ["Merriweather Sans"](https://fonts.google.com/specimen/Merriweather+Sans) font family has been selected as the main font used throughout the whole project with Sans Serif as the fallback font in any case that the font isn't being imported into the project correctly. Merriweather Sans is a classified as a variable font which allow one font file to contain multiple variations. You can change the weight, width, style, optical size, and more. The variables within variable fonts are controlled by axes.

  The ["Tauri"](https://fonts.google.com/specimen/Tauri) font family has been selected as the heading element font. Tauri is classified as a static font and is not as versitile as a variable font, hence why this is used for heading elements only. Tauri is a semi condensed sans typeface with a sense of restraint, clarity and rigor. Tauri's unique qualities do not shout and instead emerge slowly and organically as it is used.

### Imagery

This website utilises a variety of images to enhance the user experience and convey information effectively. The images serve several purposes:

- **Branding:** The logo (`assets/images/logo.png`) is used in the navigation bar to reinforce brand identity and provide a consistent visual element throughout the site.

- **Informational Images:** Images are incorporated within the accordion sections (`assets/images/esfa-2.jpg`, `assets/images/asf.jpg`) and card components (`assets/images/esfa.jpg`, `assets/images/career-search.jpg`, `assets/images/ncs.webp`, `assets/images/funding-grants.jpg`) to illustrate concepts, break up text, and make the content more engaging. These images are carefully selected to be relevant to the surrounding information.

- **Favicon:** A favicon (`assets/favicon/apple-icon.png`, `assets/favicon/favicon-32x32.png`, `assets/favicon/favicon-16x16.png`) is included to provide a visual cue for the website in browser tabs and bookmarks. This also provides a first look in to the brand of the website.

All images used on the website are optimised for web performance to ensure fast loading times and a smooth user experience. Alternative text (alt text) is provided for all images to ensure accessibility for users with visual impairments and to improve SEO. The alt text descriptions are concise and descriptive, accurately conveying the content and purpose of each image.

### Wireframes

- [Home Page Wireframe](assets/readme/wireframe-home.png)
- [Calculator Page Wireframe](assets/readme/wireframe-your-guide.png)

## 3. Features

- **Homepage with Clear ApprentiCalc Overview:**
  - A concise and informative introduction explaining the purpose of ApprentiCalc (simplifying OTJ hour calculation) and its benefits for apprentices and employers.
  - Highlights the tool's focus on accuracy, compliance, and time-saving for apprenticeship planning and management.
  - Guides users to the main calculation interface or the apprenticeship standard lookup.

- **Core On-The-Job (OTJ) Calculation Functionality:**
  - Provides intuitive input fields for apprenticeship start date, end date, and weekly working hours.
  - Accurately calculates the planned apprenticeship duration in days and weeks.
  - Precisely determines statutory leave duration in weeks based on the apprenticeship length.
  - Computes the total apprenticeship duration for calculation (in weeks and hours) after deducting leave.
  - Applies specific rules, such as capping weekly working hours at 30 for apprenticeships starting on or after 1 August 2022.
  - Calculates the minimum required OTJ training hours as 20% of the total apprenticeship duration in hours, rounded to the nearest whole number.

- **Dynamic Apprenticeship Standard Lookup & Display:**
  - Features a dynamic dropdown list allowing users to select a specific apprenticeship standard.
  - Populates the dropdown options by fetching and parsing data from an external XML file (e.g., `standard.xml`).
  - Automatically displays essential details of the selected standard, such as its ID, LARS Number, Title, Name, Level, Maximum Funding, and Duration in Months and Weeks, in read-only fields.
  - Presents standard details in a clear, organized layout (e.g., side-by-side on larger screens, stacked on smaller screens).

- **Intuitive User Interaction and Feedback:**
  - Implements immediate validation upon calculation, providing clear, combined alerts if mandatory input fields are missing or data is invalid (e.g., invalid dates, non-positive weekly hours).
  - Displays a step-by-step breakdown of all intermediate calculation results (D through H) in clearly labelled, read-only output fields.
  - Highlights the final "Minimum off-the-job training required" field (I) with a distinct background color for easy identification.
  - Includes a prominent "Reset" button that clears all input and output fields, allowing users to easily start a new calculation.

- **Responsive and Accessible Design:**
  - Website layout seamlessly adapts to various screen sizes and orientations, ensuring optimal usability on desktops, laptops, tablets, and mobile phones.
  - All input fields, buttons, and output displays are functionally accessible and clearly visible across different devices.
  - Utilizes standard web practices to ensure basic accessibility (e.g., clear labels, sufficient color contrast, keyboard navigability for interactive elements).
  - Maintains separation of HTML structure, CSS styling, and JavaScript logic in distinct files for improved maintainability and organization.
  