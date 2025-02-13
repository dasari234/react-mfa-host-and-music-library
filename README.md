# Music Library with Micro Frontend Architecture
This template provides a minimal setup to get React Micro Frontend Architecture application in Vite.

*Using ```npm create vite@latest``` command two create react independent applications were created.
*One is for the Music Library application (music-library), which allows the user to view, group, filter, and sort a collection of songs; the other is for the Host application (host-app) to use the Music Library app (Micro Frontend Architecture).

### Step1 - Take the repository from your preferred terminal and clone it. (https://github.com/dasari234/react-mfa-host-and-music-library.git)
## Installation Steps
- Step-1 - Run ```npm install``` commnad inside host-app, and then run ```npm run dev``` command in new terminal to launch application.
- Step-2 - Run ```npm install``` commnad inside music-library and then run ```npm run deploy``` command. This command creates the application and exposes the resources for remoteEntry.js to be used in the host application. It also uses a custom npm script command to build and execute the application to make use of Module Federation features.

### - Micro Frontend Architecture for a music library involves several key design decisions and trade-offs to ensure scalability, maintainability, and a seamless user experience
- Modularization and Service Boundaries
- Break the Music Library into smaller, independent micro frontends based on functionality (eg: authentication, filtering, sorting and basic role based authentication)
 - The relationship between module federation and micro-frontend Module federation

- Module federation focused on code sharing, by loading the code from one application to another application. It can load UI and non-UI code into remote applications. It allows us to share UI components and business logic at the same time. It is federated in run-time.

- Micro-frontend is shares UI components, by loading the UI components from one application to another application. We can achieve this via built-time integration by using NPM packages, or other frameworks like "@originjs/vite-plugin-federation"

- **Host Application**: serves as the main entry point, need to do the Configuration setup in vite.config.ts to consume remote MFA application URL
```js
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      remotes: {
        musicLibrary:
          process.env.VITE_MUSIC_LIBRARY_URL ||
          "http://localhost:5001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
```

- **Remote Application**: represents individual micro-frontends that are developed and deployed independently need to do the configuration setup in vite.config.ts Mapping on naming for the configuration
```js
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "music_library",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
```

- Module federation is a run-time integration introduced from Webpack by sharing common codes to achieve micro-frontend architecture. If we use Vite, we can also install the @originjs/vite-plugin-federation plugin to support it. It is also important that to get the naming right for setting up the configuration.

## - Running Tests
- Run the ```npm run test``` command in each independent application to view the status of the test cases and to verify the code coverage run the following command ```npm run test:coverage```

### User Authentication & Authorization
- Host application can be launched from the following local host url ```http://localhost:5173/```
- Enter username as ```admin``` for admin role
- Enter username as ```user``` for user role

### Build tool and Performance
- Vite (Next-Gen Frontend Tooling)
    - Faster Development – Uses ES modules to serve files directly in development, reducing build time.
    - Instant HMR (Hot Module Replacement) – Near-instant updates without full reloads.
    - Optimized Build with Rollup – Uses Rollup under the hood for optimized production builds.
    - Out-of-the-Box Support for Vue, React, and TypeScript – Zero-config setup for modern frameworks
    - Lightweight and Modern – Designed for modern browsers, meaning fewer polyfills and bloat
- Webpack (Battle-Tested Build Tool)
    - Mature and Feature-Rich – Huge ecosystem with plugins and loaders for anything.
    - Optimized for Complex Apps – Supports advanced optimizations like tree-shaking and code-splitting.
    - Better Browser Compatibility – Works well with older browsers
    - Customizable – Flexible configuration for different needs.