# Ecom-Store

Ecom-Store is a modern e-commerce platform designed to provide a seamless shopping experience for health and wellness products. Built with React and TypeScript, Ecom-Store offers robust features including user authentication, a dynamic shopping cart, coupon management, and responsive design to ensure accessibility across all devices.

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

## Project Structure

```
Ecom-Store/
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CouponSection.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── SidebarCart.tsx
│   │   ├── Header/
│   │   │   └── index.tsx
│   │   ├── Navbar/
│   │   │   └── index.tsx
│   │   ├── ProductCard/
│   │   │   └── index.tsx
│   │   └── ProductCollection/
│   │       └── index.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   └── useDevice.ts
│   ├── data/
│   │   ├── coupons.ts
│   │   ├── orders.ts
│   │   └── products.ts
│   ├── forms/
│   │   ├── FormWrapper.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── interface.ts
│   ├── jotai/
│   │   ├── CartReducer.ts
│   │   └── cart.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
├── README.md
├── package.json
└── tsconfig.json
```

## Contribution Guidelines

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.

2. **Clone the Forked Repository**

   ```bash
   git clone https://github.com/yourusername/Ecom-Store.git
   ```

3. **Navigate to the Project Directory**

   ```bash
   cd Ecom-Store
   ```

4. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

5. **Make Your Changes**

   Implement your feature or bug fix in the codebase.

6. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

7. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

8. **Open a Pull Request**

   Navigate to the original repository and click on "Compare & pull request" to submit your changes for review.

9. **Describe Your Changes**

   Provide a clear description of what you've done and why. Reference any related issues.

10. **Wait for Feedback**

    The maintainers will review your pull request and may request changes or approve it for merging.

## License

This project is licensed under the [MIT License](LICENSE).
