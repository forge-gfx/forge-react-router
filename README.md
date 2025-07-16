# Spark - React Router

A basic example of using Spark in a React app using React Router v7 framework mode (Remix). This example uses React Three Fiber to create a basic scene with a camera with [`CameraControls`](https://drei.docs.pmnd.rs/controls/camera-controls), a [`SparkRenderer`](./app/components/spark/SparkRenderer.client.tsx), and a [`SplatMesh`](./app/components/spark/SplatMesh.client.tsx).

## Running the example

```bash
npm install
npm run dev
```

## Notes

We use React Router's [client modules](https://reactrouter.com/explanation/special-files#client-modules) with the `*.client.tsx` file name convention to import and extend Spark components. This is necessary if you enable React Router's server-side rendering and you are using a Node version older than 21. Specifically, you may need to use `*.client.tsx` because the [`Navigator`](https://nodejs.org/api/globals.html#navigator) API is referenced by Spark and is not available in Node before version 21.

### Using Webpack

> [!IMPORTANT]
> This example uses Vite as the bundler. There is an issue with Spark and Webpack where the WASM URL is not properly resolved. If you are using Webpack, you can apply the following configuration to your `webpack.config.js` file:
>
> ```js
> module.exports = {
>   module: {
>     parser: {
>       javascript: {
>         url: false, // disable parsing of `new URL()` syntax
>       },
>     },
>   },
> };
> ```
