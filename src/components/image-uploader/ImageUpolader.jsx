import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile)); // preview
    setImageUrl('');
    setError('');
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setImageUrl(res.data.url);
      setPreview('');
      setFile(null);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'center' }}>
      <input type="file" onChange={handleFileChange} />
      
      {preview && (
        <div style={{ margin: '10px 0' }}>
          <p>Preview:</p>
          <img src={preview} alt="Preview" style={{ width: '100%' }} />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#008080',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
