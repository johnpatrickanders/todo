import { useState } from 'react';
import './ListForm.css';
import './ImageView.css';

export default function ({ task, setSelectedFile, selectedFile, handleSubmission }) {
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const changeHandler = (e) => {
    setIsFilePicked(true);
    const file = e.target.files[0];
    console.log(file.type)
    if (file.size > 1000000) {
      setUploadError("No files > 1mb");
    } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      setUploadError("PNG or JPEG only");
    } else {
      setSelectedFile(file);
    }
  };

  // NOT IN USE: use if want to upload via backend instead of presigned post url
  const handlePut = async (e) => {
    const formData = new FormData();
    formData.append('file', selectedFile)
    const res = await fetch(`/put_s3/${selectedFile.name}`, {
      method: "POST",
      headers: {
        'Enctype': 'multipart/form-data'
      },
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
    }
  }

  return (
    < >
      <input
        type="file"
        name="file"
        style={{
          'color': 'transparent',
          'width': '90px'
        }}
        onChange={changeHandler} />
      {isFilePicked && selectedFile ? (
        <> {selectedFile.name} </>
      ) : <span className='error'> {uploadError} </span>
      }
    </>
  )
}
