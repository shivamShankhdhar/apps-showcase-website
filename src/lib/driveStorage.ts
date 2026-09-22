/**
 * Google Drive & Cloud Storage Media Resolver
 * 
 * Supports:
 * 1. Direct local public paths (e.g., /screenshots/ludo_gameplay.jpg)
 * 2. Google Drive shareable links:
 *    - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *    - https://drive.google.com/open?id=FILE_ID
 *    Converts automatically to direct CDN rendering: https://lh3.googleusercontent.com/d/FILE_ID
 * 3. External HTTPS URLs (Cloudinary, AWS S3, Firebase Storage)
 */

export function resolveMediaUrl(url?: string): string {
  if (!url || url.trim().length === 0) {
    return '/screenshots/ludo_gameplay.jpg';
  }

  const cleanUrl = url.trim();

  // If local public asset or data URL
  if (cleanUrl.startsWith('/') || cleanUrl.startsWith('data:')) {
    return cleanUrl;
  }

  // Google Drive conversion
  const driveFileRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/;
  const match = cleanUrl.match(driveFileRegex);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return cleanUrl;
}

/**
 * Metadata for Google Drive Service Account Configuration
 * (Used when uploading directly from Admin dashboard via Drive API v3)
 */
export interface GoogleDriveConfig {
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
  folderId?: string;
}

export const driveConfigDoc = {
  description: 'To enable automated direct uploads to Google Drive from Admin:',
  steps: [
    '1. Create a Google Cloud project with Google Drive API enabled.',
    '2. Create an OAuth 2.0 Client ID or Service Account.',
    '3. Add GOOGLE_DRIVE_FOLDER_ID and credentials to .env.local.',
    '4. Until OAuth is connected, screenshots are stored in /public/screenshots/ and Google Drive shareable links are automatically parsed.',
  ],
};
