/** Flask + static demo: local dev uses the API server; production Netlify build uses /simulator/. */
export const SIMULATOR_URL =
  import.meta.env.VITE_SIMULATOR_URL ??
  (import.meta.env.PROD ? '/simulator/' : 'http://localhost:5001');
