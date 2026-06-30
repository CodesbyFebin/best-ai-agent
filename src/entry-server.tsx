import React, { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import App from './App.tsx';

export function render(url: string) {
  const initialPath = new URL(url, 'http://localhost').pathname;

  return new Promise<string>((resolve, reject) => {
    let html = '';
    let didError = false;
    const stream = new PassThrough();
    const timeout = setTimeout(() => abort(), 10000);

    stream.on('data', (chunk) => {
      html += chunk.toString();
    });
    stream.on('end', () => {
      clearTimeout(timeout);
      if (didError) reject(new Error('React server render failed.'));
      else resolve(html);
    });
    stream.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <App initialPath={initialPath} />
      </StrictMode>,
      {
        onAllReady() {
          pipe(stream);
        },
        onShellError(error) {
          clearTimeout(timeout);
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      },
    );
  });
}
