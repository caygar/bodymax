import axios from 'axios';
import React, { useState } from 'react';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/analyze-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setAnalysisResult(response.data);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || "Error uploading the file.");
      } else {
        setErrorMessage("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
          Upload
        </button>
      </div>

      {errorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </p>
      )}

      {analysisResult && (
        <div style={{ marginTop: '20px' }}>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
