/**
 * Utility to handle path prefixing for assets when deployed to GitHub Pages
 * 
 * This ensures assets are loaded correctly regardless of where the app is hosted
 * (locally or on GitHub Pages with a base path)
 */

// Get the base path from environment or use a fallback
const getBasePath = () => {
  // Try to use the environment variable first (set by Create React App during build)
  if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL;
  }
  
  // Fallback for production
  if (process.env.NODE_ENV === 'production') {
    // The homepage is set to https://yamenelrayes.github.io/os-portfolio
    // We want to extract the path part: /os-portfolio
    return '/os-portfolio';
  }
  
  // Local development
  return '';
};

/**
 * Returns the correct path for an asset, accounting for the base path when deployed
 * @param {string} path - The relative path to the asset
 * @returns {string} The correctly prefixed asset path
 */
export const getAssetPath = (path) => {
  const basePath = getBasePath();
  
  // Make sure we don't double-prefix paths
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  
  return `${basePath}/${path}`;
}; 