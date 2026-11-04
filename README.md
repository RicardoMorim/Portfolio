# Ricardo Morim Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features multilingual support, dark/light mode, and interactive project showcases.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Bilingual Support**: Toggle between English and Portuguese
- **Theme Switching**: Dark and light mode support
- **Interactive UI**: 
  - Animated sections
  - Image modals with zoom functionality
  - Smooth scrolling
  - Typing animation effect
- **Project Showcase**: Interactive project cards with live demos and source code links
- **Contact Form**: Integrated contact functionality
- **Performance Optimized**: Built with Next.js App Router for optimal performance

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Icons](https://react-icons.github.io/react-icons/) - Icons

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/portfolio.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## 📁 Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # React components
├── context/         # React context providers
├── language/        # Internationalization
│   ├── config.ts    # Language configuration
│   └── translations/ # Translation files
├── styles/          # Global styles
```

## 🌍 Internationalization

The website supports both English and Portuguese languages. Translations are managed through the LanguageContext.

## 🎨 Theming

Theme switching is handled by the ThemeContext, supporting both dark and light modes.

## 🔧 Configuration

Environment variables can be configured in .env.local:

```.env
EMAIL_USER=<Your Email>
EMAIL_PASS=<Your App Password>
```

## 📱 Responsive Design
The website is fully responsive with breakpoints most breakpoints happening at:

Mobile: < 768px

Tablet: 768px - 1024px

Desktop: > 1024px

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contact
Ricardo Morim - [LinkedIn](https://www.linkedin.com/in/ricardo-morim-208368251/)

Project Link: https://www.ricardomorim.com