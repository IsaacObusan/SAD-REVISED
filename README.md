
🧭 JobCompass: Employment Opportunity Navigator for PWDs
JobCompass is a digital platform that connects Persons with Disabilities (PWDs) in Camarines Norte to inclusive employment opportunities.

![470055840_1693901331154505_2936764786385761488_n](https://github.com/user-attachments/assets/e113f4eb-fd8b-4267-b951-2164369700dd)

🔑 Features
👤 For PWD Job Seekers
🔍 Search & filter jobs

🏢 Explore hiring companies

📄 Apply with resume & cover letter

🧾 Track application status

📚 Access career tips & tutorials

👤 Manage personal profile

🏢 For Employers
📊 View dashboard analytics

📌 Post, edit, activate/deactivate jobs

👁️‍🗨️ Review & filter applicants

🗓 Schedule interviews

⚙️ For Admins
🛠 Manage users & job posts

📑 Track all applications

📈 Generate reports

⚙️ Configure system settings

♿ Accessibility Toolbar
🔠 Text size & spacing adjustment

🔍 Magnifier

🎙 Speech-to-text input

🔄 Reset to default

🖥️ System Requirements
Devices:

Desktop: Windows 10+, macOS 10.15+, Linux (4GB RAM, 50GB Storage)

Mobile: iOS/Android, 7"+ screen

Browser: Chrome, Firefox, Edge, Safari
Internet: 5 Mbps+ recommended

🚀 Getting Started
👥 Sign Up (Employee)
Visit the JobCompass site

Click Sign Up → Employee

Fill in info and upload resume

Create account

🔐 Login
Go to the Login page

Enter email & password

Click Login

Forgot password? Use the recovery link

💼 Explore & Apply (Applicant)
Use search & filters to find jobs

Click Apply and follow the prompts

Track progress in My Applications

📢 Post & Manage Jobs (Employer)
Login → Dashboard → Post Job

Fill job details, Submit

View/edit/deactivate as needed

Review applicants & manage interview status



Additional Information:


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
