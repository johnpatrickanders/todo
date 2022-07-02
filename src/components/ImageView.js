import { useState } from 'react';
import './ListForm.css'
import './ImageView.css'

export default function ({ task }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [returnedGetUrl, setReturnedGetUrl] = useState();

  const changeHandler = (e) => {
    // let reader = new FileReader()
    // const rawFile = e.target.files[0];

    // reader.readAsDataURL(rawFile);
    // reader.onload = () => {
    //   setSelectedFile({
    //     queryImage: reader.result,
    //     name: rawFile.name,
    //     type: rawFile.type,
    //     size: rawFile.size
    //   });
    setIsFilePicked(true);
    // }
    setSelectedFile(e.target.files[0]);
  };

  const uploadToS3 = async (url, fields) => {
    console.log(selectedFile);
    fields['file'] = selectedFile.queryImage;
    const res = await fetch(url, {
      method: 'PUT',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      fields
    });
    if (res.ok) {
      console.log("PARTY");
    }
  }

  const handleSubmission = async () => {
    console.log(selectedFile.file);
    const res = await fetch('/sign_s3', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: selectedFile.name,
        fileType: selectedFile.type
      })
    });
    if (res.ok) {
      const { fields, url } = await res.json();
      console.log(fields, url);

      uploadToS3(url, fields);
    }
  }

  const handleGet = async () => {
    const res = await fetch(`/sign_s3_get/${selectedFile.name}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setReturnedGetUrl(data.url);
    }
  }
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
      console.log(data);
    }
  }

  return (
    <div className='image__form'>
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
        <button onClick={handleGet}>Get Test</button>
        <button onClick={handlePut}>Put Test</button>
      </div>
      <img
        src={`${returnedGetUrl}`}
      />
    </div>
  )
}
