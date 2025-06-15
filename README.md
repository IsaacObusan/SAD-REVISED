
🧭 JobCompass: Employment Opportunity 
Navigator for PWDs of Camarines Norte  


![Uploading jobcompass-manual (1).png…]()


JobCompass is a dedicated digital platform designed to empower Persons with Disabilities (PWDs) in Camarines Norte by connecting them with relevant employment opportunities. It aims to bridge the gap between PWDs and potential employers, fostering a more inclusive job market.

Table of Contents
System Introduction

Key Features

For PWD Job Seekers

For Employers

For Administrators

Accessibility Toolbar

System Requirements

Getting Started

Sign Up (Employee)

Login

Exploring Career Options (Applicant)

Applying for Jobs (Applicant)

Managing Applications (Applicant)

Posting a New Job (Employer)

Managing Job Postings (Employer)

Reviewing Applicants (Employer)

FAQ

Contact Support

System Introduction
JobCompass provides a dedicated space for PWDs to showcase their skills and abilities, access a diverse range of job opportunities, and increase their chances of employment. It offers distinct interfaces for applicants, employers, and administrators to ensure a tailored and efficient experience for all users.

Key Features
For PWD Job Seekers
Browse Featured Jobs: Explore suggested job postings on the dashboard.

Search for Jobs: Use a powerful search bar with filters (keywords, location, job type) to find matching opportunities.

Explore Companies: Learn more about companies actively hiring PWDs.

Apply for Jobs: Easily submit applications, including resumes and cover letters.

Manage Applications: Track the status of submitted applications (e.g., shortlisted for an interview).

Career Resources: Access tutorials and career advice on job searching, resume writing, and interview preparation.

Personal Profile Management: Create and manage a job seeker profile to highlight skills and qualifications.

For Employers
Employer Dashboard: A centralized platform to manage recruitment needs.

Job Posting Insights: View analytics on active jobs, applications received, and positions filled.

Application Distribution: See a pie chart showing the distribution of applications across job postings.

Manage Job Postings: View, edit, post, deactivate, and reactivate job listings.

Review Applicants: Filter and review applications for job postings, with options to mark as pending, shortlist, or reject.

Schedule Interviews: Plan and manage interviews directly through the platform.

For Administrators
Admin Dashboard: A central hub for platform management.

User Account Management: Oversee and update user accounts.

Job Posting Management: Manage all job postings on the platform.

Application Tracking: Monitor and review all applications.

Analytics Generation: Generate reports and insights on platform activity.

System Settings Configuration: Adjust and maintain overall system settings.

Accessibility Toolbar
The JobCompass platform features an Accessibility Toolbar to customize the viewing experience for users. Located typically at the bottom of the screen, it includes:

Text Size Slider: Adjusts the size of text, videos, and icons.

Spacing Adjustment: Modifies spacing between elements for better readability.

Magnifier: Enlarges portions of the screen.

Speech-to-Text: Converts spoken words into text, useful for searching and filling forms.

Reset Button: Restores all accessibility settings to default.

System Requirements
To ensure optimal performance, your system should meet the following minimum requirements:

A. Device

Computer or Laptop:

Operating System: Windows 10 or later, macOS 10.15 Catalina or later, or a compatible Linux distribution.

Processor: A modern processor with sufficient processing power.

Memory (RAM): At least 4GB of RAM.

Storage: At least 50GB of free storage space.

Display: A screen with a minimum resolution of 1024x768 pixels.

Accessibility Features: Ensure your device has built-in accessibility features (screen readers, magnifiers, keyboard navigation).

Tablet or Smartphone:

Operating System: A device with a recent operating system (iOS or Android).

Screen Size: At least 7 inches for optimal viewing.

Accessibility Features: Ensure your device has built-in accessibility features (voice control, screen readers, magnifiers).

B. Internet Connection

A stable internet connection with a minimum speed of 5 Mbps is recommended for optimal performance.

C. Web Browser

Google Chrome

Mozilla Firefox

Microsoft Edge

Safari

Getting Started
Sign Up (Employee)
Open your web browser and navigate to the JobCompass website.

Click on the Sign Up button.

Select Employee from the options provided.

Fill in the required information: Full Name, Email address, Age, and create a secure Password (re-enter for confirmation).

Upload your Resume or CV by clicking Choose File.

Optionally, provide a link to your online portfolio.

Click on the Upload Resume button to submit your information and create your account.

Login
Open your web browser and navigate to the JobCompass website (you should be automatically directed to the login page).

Enter your registered email address and password in the provided fields.

Click the Login button to access your JobCompass account.

If you have forgotten your password, click on the Forgot Password? link and follow the instructions.

If you don't have an account, click on the Don't have an account? Sign Up link.

Exploring Career Options (Applicant)
Browse Featured Jobs: Explore the featured job suggestions displayed on your dashboard.

Search for Jobs: Use the search bar to find jobs matching your skills and interests (filter by keywords, location, job type).

Explore Companies: Learn more about companies hiring PWDs.

Applying for Jobs (Applicant)
Click on the Apply button for any job that interests you.

Follow the instructions to submit your application, including uploading your resume and cover letter.

Managing Applications (Applicant)
Track the status of your applications in the My Applications section of your dashboard.

View the status of each application and see if you have been shortlisted for an interview.

Posting a New Job (Employer)
Log in to your JobCompass account as an employer.

Navigate to the Jobs tab on the dashboard.

Click on the Post Job button at the bottom of the page.

Follow the on-screen instructions to fill in the job details (title, description, requirements, salary).

Click Submit to post the job.

Managing Job Postings (Employer)
Viewing: The Jobs page displays a list of all your active and past job postings with details like job title, description, rate, status, and an Edit button.

Editing: Click Edit next to the job posting you want to modify, make changes, and click Save.

Deactivating/Reactivating: Click Edit and then select Deactivate or Reactivate as needed.

Reviewing Applicants (Employer)
Click on the Applicants tab to view a list of applicants.

Each applicant's profile will display their name, age, disability, applied job title, application content, date, status, and an action button.

Click on the View Profile button for a detailed view (skills, experience, contact).

Decide on the next step:

Pending: If you need more time to review.

Shortlist: If you're interested and want to schedule an interview.

Reject: If the applicant is not suitable.

FAQ
Is JobCompass free to use?
Yes, JobCompass is free for both job seekers and employers.

How secure is my information on JobCompass?
JobCompass takes data security very seriously and implements robust security measures to protect your personal information.

What kind of jobs are available on JobCompass?
JobCompass offers a wide range of jobs, including full-time, part-time, and freelance positions.




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
