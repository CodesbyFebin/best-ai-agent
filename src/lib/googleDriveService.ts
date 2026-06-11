import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Reuse-initialized app flag to prevent duplicate initialization
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request Workspace scopes
provider.addScope('https://www.googleapis.com/auth/drive');

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token in memory.
let cachedAccessToken: string | null = null;

// Initialize auth state listener. Call this on app load.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const setAccessTokenInMemory = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Interface for Drive File
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  iconLink?: string;
  webViewLink?: string;
  size?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
}

// Drive API endpoints implementation
export const listDriveFiles = async (token: string, q: string = ''): Promise<DriveFile[]> => {
  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.append('fields', 'files(id, name, mimeType, webViewLink, size, modifiedTime, thumbnailLink, iconLink)');
  url.searchParams.append('orderBy', 'folder,modifiedTime desc');
  url.searchParams.append('pageSize', '50');
  
  if (q) {
    url.searchParams.append('q', q);
  } else {
    // Exclude trashed files by default
    url.searchParams.append('q', "trashed = false");
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Drive API list files error: ${res.statusText} (${errText})`);
  }

  const data = await res.json();
  return data.files || [];
};

// Create a Folder
export const createDriveFolder = async (token: string, folderName: string): Promise<DriveFile> => {
  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Drive API create folder error: ${res.statusText} (${errText})`);
  }

  return await res.json();
};

// Create a Text File
export const createDriveTextFile = async (token: string, filename: string, content: string, folderId?: string): Promise<DriveFile> => {
  // Simple multi-part or single upload for text
  const metadata: any = {
    name: filename,
    mimeType: 'text/plain',
  };

  if (folderId) {
    metadata.parents = [folderId];
  }

  // We use the simpler upload flow or metadata + media upload via multipart/related
  // Let's perform a simple drive upload protocol. To do this, we can make a POST request to 
  // https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart
  const boundary = 'bestaiagent_multipart_boundary';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const body = 
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain\r\n\r\n' +
    content +
    closeDelimiter;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: body,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Drive API upload file error: ${res.statusText} (${errText})`);
  }

  return await res.json();
};

// Read Text File Content
export const readDriveFileTextContent = async (token: string, fileId: string): Promise<string> => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Drive API download file error: ${res.statusText} (${errText})`);
  }

  return await res.text();
};

// Delete File
export const deleteDriveFile = async (token: string, fileId: string): Promise<void> => {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Drive API delete file error: ${res.statusText} (${errText})`);
  }
};
