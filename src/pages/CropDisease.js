import React, { useState } from 'react';
import '../styles/CropDisease.css';
import axios from 'axios';

const CropDisease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResult(null); // Clear previous results
    setError(null);  // Clear previous errors
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { predicted_class, confidence } = response.data;

      // Parse the result into Crop and Predicted Disease
      const [crop, ...diseaseParts] = predicted_class.split(' ');
      const disease = diseaseParts.join(' ');

      const formattedResult = `Crop: ${crop}, Predicted: ${
        disease.toLowerCase() === 'healthy' ? 'Healthy' : disease
      } (Confidence: ${(confidence * 100).toFixed(2)}%)`;

      setResult(formattedResult);
      setError(null);
    } catch (err) {
      setError('Error predicting the disease. Please try again.');
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1>Crop Disease Detection</h1>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button onClick={handlePredict}>Predict Disease</button>
      </div>
      {result && <div className="result">{result}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CropDisease;
