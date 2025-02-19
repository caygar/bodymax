import React from 'react';
import FileUpload from './FileUpload';

function App() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>BodyMax - Web Demo</h1>
      <p>Upload an image to get your (mocked) body composition analysis.</p>
      <FileUpload />
    </div>
  );
}

export default App;
