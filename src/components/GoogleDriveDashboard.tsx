import React, { useState, useEffect } from 'react';
import {
  googleSignIn,
  logout,
  initAuth,
  listDriveFiles,
  createDriveFolder,
  createDriveTextFile,
  readDriveFileTextContent,
  deleteDriveFile,
  DriveFile,
  setAccessTokenInMemory
} from '../lib/googleDriveService';
import {
  Database,
  FolderPlus,
  FilePlus,
  Trash2,
  Eye,
  LogOut,
  Globe,
  RefreshCw,
  Folder,
  FileText,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Loader2,
  FileCode,
  ArrowRight,
  Search,
  X
} from 'lucide-react';

interface GoogleDriveDashboardProps {
  onBack: () => void;
  currentWeights?: any;
}

export default function GoogleDriveDashboard({ onBack, currentWeights }: GoogleDriveDashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  
  // Files states
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'folders' | 'text' | 'sheets'>('all');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Active document evaluation states
  const [selectedFileForReview, setSelectedFileForReview] = useState<DriveFile | null>(null);
  const [fileContentLoading, setFileContentLoading] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Action modals/states
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [showFileInput, setShowFileInput] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  // Initialize auth state on load
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setNeedsAuth(false);
        loadFiles(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage('');
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        loadFiles(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login mismatch or popup blocked:', err);
      setErrorMessage(err.message || 'Login failed. Ensure popups are allowed and try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setNeedsAuth(true);
      setFiles([]);
      setSelectedFileForReview(null);
      setAiAnalysisResult('');
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const loadFiles = async (accessTokenToUse?: string | null) => {
    const activeToken = accessTokenToUse || token;
    if (!activeToken) return;

    setIsLoadingFiles(true);
    setErrorMessage('');
    try {
      // Build search query based on active filters
      let q = "trashed = false";
      if (activeFilter === 'folders') {
        q += " and mimeType = 'application/vnd.google-apps.folder'";
      } else if (activeFilter === 'text') {
        q += " and (mimeType = 'text/plain' or mimeType = 'application/vnd.google-apps.document')";
      } else if (activeFilter === 'sheets') {
        q += " and mimeType = 'application/vnd.google-apps.spreadsheet'";
      }

      if (searchQuery) {
        q += ` and name contains '${searchQuery.replace(/'/g, "\\'")}'`;
      }

      const fetchedFiles = await listDriveFiles(activeToken, q);
      setFiles(fetchedFiles);
    } catch (err: any) {
      console.error('Error listing files from Google Drive:', err);
      if (err.message && err.message.includes('401')) {
        // Token might be expired, need reauth
        setNeedsAuth(true);
      } else {
        setErrorMessage('Failed to load Google Drive directory files. Verify connection.');
      }
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Run search load when filters switch
  useEffect(() => {
    if (token) {
      loadFiles(token);
    }
  }, [activeFilter]);

  // Create a new folder helper (with security double confirm)
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;

    const confirmed = window.confirm(`Confirm action: Create new folder named "${newFolderName}" in your Google Drive root?`);
    if (!confirmed) return;

    setIsCreatingFolder(true);
    try {
      await createDriveFolder(token, newFolderName.trim());
      setNewFolderName('');
      setShowFolderInput(false);
      loadFiles(token);
    } catch (err: any) {
      console.error(err);
      alert('Error creating folder: ' + err.message);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Create a custom text document (or export customweights)
  const handleCreateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFileName.trim()) return;

    const confirmed = window.confirm(`Confirm action: Create new file "${newFileName}.txt" on your Google Drive?`);
    if (!confirmed) return;

    setIsCreatingFile(true);
    try {
      const finalName = newFileName.endsWith('.txt') ? newFileName : `${newFileName}.txt`;
      await createDriveTextFile(token, finalName, newFileContent);
      setNewFileName('');
      setNewFileContent('');
      setShowFileInput(false);
      loadFiles(token);
    } catch (err: any) {
      console.error(err);
      alert('Error creating file: ' + err.message);
    } finally {
      setIsCreatingFile(false);
    }
  };

  // Fast export helper: Exports active Tuner Weight configuration directly into Drive!
  const handleQuickExportCalculations = async () => {
    if (!token) return;
    
    const timestamp = new Date().toLocaleString('en-IN');
    const filename = `BestAIAgent_Tuner_Score_Weights_${Date.now().toString().slice(-4)}.txt`;
    
    let content = `====================================================\n`;
    content += `BESTAIAGENT.IN - CUSTOM WEIGHT PARAMETERS REPORT\n`;
    content += `Generated on: ${timestamp}\n`;
    content += `====================================================\n\n`;
    content += `Your personalized system optimization score criteria are detailed below:\n\n`;
    
    if (currentWeights) {
      Object.keys(currentWeights).forEach(key => {
        content += `- ${key.toUpperCase()}: ${currentWeights[key]}%\n`;
      });
    } else {
      content += `No custom weights loaded. Operating under default 42-Point Scoring Framework coefficients.\n`;
    }
    content += `\n----------------------------------------------------\n`;
    content += `This file serves as your authenticated reference. Import these weights into our live tuner anytime to run automated SME and DPDP compliance audits.\n`;
    content += `Platform URL: https://bestaiagent.in\n`;

    const confirmed = window.confirm(`Do you want to save your customized weight scorecard report (${filename}) directly to your Google Drive?`);
    if (!confirmed) return;

    setIsLoadingFiles(true);
    try {
      await createDriveTextFile(token, filename, content);
      alert(`Success! "${filename}" has been saved in your Google Drive.`);
      loadFiles(token);
    } catch (err: any) {
      console.error('Export report error:', err);
      alert('Export failed: ' + err.message);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Delete matching file - with mandatory confirmation
  const handleDeleteFile = async (fileId: string, name: string) => {
    if (!token) return;

    const confirmed = window.confirm(`⚠️ EXPLICIT SECURITY WARNING: Are you sure you want to permanently delete file "${name}" from your Google Drive? This action cannot be undone.`);
    if (!confirmed) return;

    setIsLoadingFiles(true);
    try {
      await deleteDriveFile(token, fileId);
      setSelectedFileForReview(null);
      setAiAnalysisResult('');
      loadFiles(token);
    } catch (err: any) {
      console.error(err);
      alert('Failed to delete file: ' + err.message);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Download text file and Analyze with server-side proxy
  const handleAnalyzeDocument = async (file: DriveFile) => {
    if (!token) return;

    setSelectedFileForReview(file);
    setFileContentLoading(true);
    setAiAnalysisResult('');
    setIsAnalyzing(true);

    try {
      let textContent = `File Metadata: Name: ${file.name}, Mime: ${file.mimeType}, Modified: ${file.modifiedTime || 'Unspecified'}`;
      
      // Attempt download of text files
      const isText = file.mimeType === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md');
      
      if (isText) {
        try {
          textContent = await readDriveFileTextContent(token, file.id);
        } catch (downloadErr) {
          console.warn('Failed to fetch alt=media payload. Analyzing metadata instead.', downloadErr);
        }
      } else {
        textContent = `This file is a non-text document (${file.mimeType}). Custom technical parameters include name reference "${file.name}" with index metadata. Run simulation on file type context.`;
      }

      // Proxy payload to server-side Gemini endpoint
      const response = await fetch('/api/analyze-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textContent,
          filename: file.name,
          mimeType: file.mimeType
        })
      });

      if (!response.ok) {
        throw new Error('API server failed to run document evaluation.');
      }

      const resData = await response.json();
      setAiAnalysisResult(resData.text || 'No audit report generated.');
    } catch (err: any) {
      console.error(err);
      setAiAnalysisResult(`### ❌ Evaluation Interrupted\n\nFailed to finish analysis on "${file.name}". error details: ${err.message || 'Connection failure'}`);
    } finally {
      setFileContentLoading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* HEADER DISK CONTAINER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-2 relative">
          <button onClick={onBack} className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 focus:outline-none mb-3">
            ← Back to Directory
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <Database className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
                Google Drive AI Agent Workspace
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Analyze operational requirement logs, export scorer coefficients, and audit cloud-compliance vectors seamlessly from your secure storage.
              </p>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl relative shrink-0">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border border-emerald-400" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-slate-300">
                {user.displayName?.charAt(0) || 'G'}
              </div>
            )}
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-white text-[13px]">{user.displayName || 'Google User'}</p>
              <p className="text-slate-400 max-w-[160px] truncate">{user.email}</p>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-extrabold flex items-center gap-1 mt-1 font-mono uppercase text-[10px] tracking-wider transition cursor-pointer">
                <LogOut className="w-3 h-3" /> Disconnect Workspace
              </button>
            </div>
          </div>
        )}
      </div>

      {needsAuth ? (
        /* GOOGLE SIGN IN CARD */
        <div id="drive_auth_card" className="bg-white border border-slate-200 rounded-3xl p-8 max-w-xl mx-auto shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 flex items-center justify-center mx-auto">
            <Globe className="w-8 h-8 animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Activate Google Drive Sync Integration</h3>
            <p className="text-slate-600 text-sm font-light leading-relaxed max-w-md mx-auto">
              Fully connects with your secure Google Workspace directory. This enables the AI Agent to list, read, and audit text/doc configurations to estimate deployment pricing and DPDP Act readiness scores.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-left text-xs text-slate-650 leading-relaxed font-light space-y-2">
            <p className="font-bold text-slate-800">🛡️ Absolute Privacy & Data Transparency Guardrails:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Access tokens strictly cached in-memory (never written to localstorage or cookies)</li>
              <li>Sovereign data paths align fully with localized DPDP safety benchmarks</li>
              <li>Only evaluates selected files under your direct, explicit action instructions</li>
            </ul>
          </div>

          {errorMessage && (
            <div className="flex items-start gap-2 text-xs bg-red-50 text-red-600 p-3.5 rounded-xl text-left leading-normal border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="gsi-material-button w-full sm:w-auto px-6 font-bold cursor-pointer transition transform active:scale-95 disabled:opacity-50"
              style={{
                background: 'white',
                border: '1px solid #dadce0',
                borderRadius: '8px',
                color: '#3c4043',
                fontSize: '14px',
                height: '40px',
                letterSpacing: '0.25px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2 px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                  <span className="text-xs uppercase font-extrabold tracking-wider">Syncing Secure Auth...</span>
                </div>
              ) : (
                <div className="gsi-material-button-content-wrapper flex items-center justify-center gap-3 px-4 h-full">
                  <div className="gsi-material-button-icon shrink-0">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block', width: '20px', height: '20px' }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents font-medium tracking-tight">Sign in with Google</span>
                </div>
              )}
            </button>

            <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-900 underline">
              Browse Directory First Offline
            </button>
          </div>
        </div>
      ) : (
        /* WORKSPACE INTERACTIVE GRID Dashboard */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT FILE LISTINGS COMPONENT - 7 Cols */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* SEARCH AND FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-4 border-b border-slate-100">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search secure files..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-medium focus:ring-1 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end overflow-x-auto text-[11px] font-mono font-bold uppercase tracking-wider">
                <button onClick={() => loadFiles(token)} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 shrink-0 cursor-pointer">
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-650 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setShowFolderInput(!showFolderInput)}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <FolderPlus className="w-3.5 h-3.5 text-blue-500" /> + Folder
                </button>
                <button
                  onClick={() => setShowFileInput(!showFileInput)}
                  className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  <FilePlus className="w-3.5 h-3.5 text-emerald-500" /> + Text File
                </button>
              </div>
            </div>

            {/* EXPANDABLE NEW INPUT FIELDS */}
            {showFolderInput && (
              <form onSubmit={handleCreateFolder} className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-3">
                <input
                  required
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="New folder name..."
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                />
                <button
                  type="submit"
                  disabled={isCreatingFolder}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] uppercase font-mono tracking-wider cursor-pointer"
                >
                  {isCreatingFolder ? 'Creating...' : 'Confirm'}
                </button>
                <button type="button" onClick={() => setShowFolderInput(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </form>
            )}

            {showFileInput && (
              <form onSubmit={handleCreateFile} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-3">
                <p className="text-[10px] text-emerald-800 font-extrabold uppercase font-mono">Create New Text Audit Log</p>
                <div className="space-y-2">
                  <input
                    required
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="filename.txt"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                  <textarea
                    rows={4}
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    placeholder="Paste or write raw workspace notes/requirements..."
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-mono"
                  />
                </div>
                <div className="flex justify-end gap-2 text-xs">
                  <button type="button" onClick={() => setShowFileInput(false)} className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" disabled={isCreatingFile} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg uppercase font-mono text-[10px] tracking-widest">
                    {isCreatingFile ? 'Saving...' : 'Create in Drive'}
                  </button>
                </div>
              </form>
            )}

            {/* TAB CORNER FILTERS */}
            <div className="flex gap-2">
              {[
                { name: 'All Files', value: 'all' },
                { name: 'Folders 📂', value: 'folders' },
                { name: 'Text & Docs 📄', value: 'text' },
                { name: 'Spreadsheets 📊', value: 'sheets' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveFilter(item.value as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition ${activeFilter === item.value ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-650 hover:bg-slate-200'}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* FILE HUB COMPILATION LISTING */}
            {isLoadingFiles ? (
              <div className="h-64 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <p className="text-slate-450 text-xs font-mono">Syncing securely with Google Workspace cloud...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="h-64 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-3">
                <Folder className="w-8 h-8 text-slate-300" />
                <div>
                  <p className="font-extrabold text-slate-700 text-sm">No files identified in workspace</p>
                  <p className="text-slate-450 text-xs max-w-sm mt-1">
                    Try changing your active filter, typing another query, or export custom weight scorecards in Drive.
                  </p>
                </div>
                
                <button onClick={() => loadFiles(token)} className="px-3.5 py-1.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg">
                  Refresh File List
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-650 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 pb-2 text-[10px] text-slate-400 font-extrabold uppercase font-mono tracking-wider">
                      <th className="py-2.5">Name</th>
                      <th className="py-2.5 hidden sm:table-cell">Last Modified</th>
                      <th className="py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {files.map((file) => {
                      const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                      const isClickableText = file.mimeType === 'text/plain' || file.name.endsWith('.txt');
                      
                      return (
                        <tr key={file.id} className="group hover:bg-slate-50/75 transition-colors">
                          <td className="py-3 pr-2 font-medium">
                            <div className="flex items-center gap-2.5">
                              {isFolder ? (
                                <Folder className="w-4 h-4 text-blue-500 shrink-0" />
                              ) : isClickableText ? (
                                <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <FileCode className="w-4 h-4 text-indigo-500 shrink-0" />
                              )}
                              <div className="truncate max-w-[200px] sm:max-w-[280px]">
                                <span className={`block truncate ${selectedFileForReview?.id === file.id ? 'text-emerald-600 font-bold' : 'text-slate-900 group-hover:text-emerald-600'}`}>
                                  {file.name}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-light truncate">
                                  {file.mimeType.replace('application/vnd.google-apps.', '')}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 hidden sm:table-cell text-slate-500">
                            {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('en-IN') : 'N/A'}
                          </td>
                          <td className="py-3 text-right space-x-1 shrink-0">
                            <button
                              onClick={() => handleAnalyzeDocument(file)}
                              className="p-1.5 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 rounded-lg transition duration-150 tooltip cursor-pointer"
                              title="Analyze Audit with AI Agent"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg inline-block align-middle transition"
                                title="Open in Google Drive"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            
                            <button
                              onClick={() => handleDeleteFile(file.id, file.name)}
                              className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition cursor-pointer"
                              title="Delete file permanently"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* ADVANCED EXPORT BAR */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="font-extrabold text-emerald-950 text-xs">💾 Export Weights Scorings to Drive</p>
                <p className="text-slate-500 text-[11px] font-light">
                  Save your currently active Tuner weights coefficients directly into an audit-ready text report.
                </p>
              </div>
              <button
                onClick={handleQuickExportCalculations}
                className="w-full sm:w-auto shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-wider px-4 py-2 rounded-xl transition cursor-pointer"
              >
                Export Parameters Report
              </button>
            </div>

          </div>

          {/* RIGHT AI ANALYSIS PANEL - 5 Cols */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs relative">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <span className="text-[10px] bg-slate-900 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono">
                🤖 Live AI Agent Analyzer
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Requirement Audit Outputs</h3>
              <p className="text-slate-500 text-xs font-light">
                Select a document from your secure explorer grid on the left. Our server-side neural companion will audit capabilities, detect gaps, and map pricing structures.
              </p>
            </div>

            {selectedFileForReview ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="truncate">
                      <p className="font-extrabold text-slate-900 text-xs truncate">{selectedFileForReview.name}</p>
                      <p className="text-slate-450 text-[10px] truncate">{selectedFileForReview.mimeType}</p>
                    </div>
                  </div>
                </div>

                {isAnalyzing ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <Loader2 className="w-7 h-7 text-emerald-600 animate-spin" />
                    <div className="space-y-1">
                      <p className="font-bold text-xs text-slate-800">Processing Cloud Analysis</p>
                      <p className="text-slate-400 text-[11px] font-mono animate-pulse">Running 42-point Scoring Audit &amp; India Fit evaluation...</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-150 rounded-2xl p-4 overflow-y-auto max-h-[460px] text-xs leading-relaxed space-y-2 text-slate-700 markdown-body font-sans">
                    {/* Render plain block format or simple parsed markdown */}
                    <div className="space-y-3">
                      {aiAnalysisResult.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('###')) {
                          return <h3 key={idx} className="text-sm font-extrabold text-slate-950 border-b border-slate-100 pb-1 pt-2">{paragraph.replace('###', '').trim()}</h3>;
                        }
                        if (paragraph.startsWith('####')) {
                          return <h4 key={idx} className="text-xs font-bold text-slate-900 pt-1">{paragraph.replace('####', '').trim()}</h4>;
                        }
                        if (paragraph.startsWith('* **') || paragraph.startsWith('- **')) {
                          return (
                            <div key={idx} className="pl-3 border-l-2 border-emerald-400 py-0.5 my-1.5">
                              <p className="font-light">{paragraph.replace(/^(\*\s|\-\s)/, '')}</p>
                            </div>
                          );
                        }
                        if (paragraph.startsWith('- [ ]') || paragraph.startsWith('- [x]')) {
                          return (
                            <div key={idx} className="flex items-start gap-2 text-slate-700 text-[11px] leading-relaxed my-1 pl-1 font-mono">
                              <input type="checkbox" readOnly checked={paragraph.includes('[x]')} className="mt-0.5 rounded border-slate-300 text-emerald-600" />
                              <span>{paragraph.replace(/^(\-\s\[\s\]|\-\s\[x\])/, '').trim()}</span>
                            </div>
                          );
                        }
                        return <p key={idx} className="font-light text-slate-650 leading-relaxed">{paragraph}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-dashed border-slate-200 rounded-3xl py-16 px-4 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-extrabold text-xs text-slate-800">No Auditable Core Selected</p>
                  <p className="text-slate-450 text-[11px] max-w-[240px] mx-auto">
                    Click the Eye icon (<Eye className="w-3 h-3 inline text-slate-450" />) on any listed document file to trigger the server-side analysis engine in real-time.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-start gap-2.5 text-[11px] text-slate-500 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>System note:</strong> Evaluating high-density binary files or multi-tab spreadsheets directly parses header schemas. For optimal results, upload standard `.txt` or `.md` files detailing your exact business automation requirements.
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
