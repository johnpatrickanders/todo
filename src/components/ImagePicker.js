import { useState } from 'react';
import './ListForm.css'
import './ImageView.css'

export default function ({ task, setSelectedFile, selectedFile, handleSubmission }) {
  const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = (e) => {
    setIsFilePicked(true);
    setSelectedFile(e.target.files[0]);
  };

  // const uploadToS3 = async (url, fields) => {
  //   const formData = new FormData();
  //   for (const [key, val] of Object.entries(fields)) {
  //     formData.append(key, val);
  //   }
  //   console.log(fields)
  //   formData.append('file', selectedFile);
  //   const res = await fetch(url, {
  //     method: "POST",
  //     body: formData
  //   });
  //   if (res.ok) {
  //     console.log('uploaded...')
  //   }
  // }

  // const handleSubmission = async () => {
  //   console.log(selectedFile.file);
  //   const res = await fetch('/sign_s3_post', {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       fileName: selectedFile.name,
  //       fileType: selectedFile.type
  //     })
  //   });
  //   if (res.ok) {
  //     const { fields, url } = await res.json();
  //     console.log(fields);

  //     uploadToS3(url, fields);
  //   }
  // }

  // const handleGet = async () => {
  //   const res = await fetch(`/sign_s3_get/${selectedFile.name}`);
  //   if (res.ok) {
  //     const data = await res.json();
  //     console.log(data);
  //     setReturnedGetUrl(data.url);
  //   }
  // }

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
      ) : <></>
      }
    </>
  )
}
