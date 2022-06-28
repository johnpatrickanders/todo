import { useState } from 'react';
import './ListForm.css'
import './ImageView.css'

export default function ({ task }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [returnedGetUrl, setReturnedGetUrl] = useState();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const uploadToS3 = async (url, fields) => {
    console.log(selectedFile);
    fields['file'] = selectedFile;
    const res = await fetch(url + '/' + selectedFile.name, {
      method: 'POST',
      body: JSON.stringify({
        fields
      })
    });
    if (res.ok) {
      console.log("PARTY");
    }
  }

  const handleSubmission = async () => {
    console.log(selectedFile.name);
    const res = await fetch('/sign_s3_post', {
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
    const res = await fetch('/sign_s3_get/test.jpg');
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setReturnedGetUrl(data.url)
      // const file = await fetch(data.url, {
      //   // headers: {
      //   //   'Content-Type': 'image/png',
      //   //   'Content-Disposition': 'inline; filename="picture.png"'
      //   // }
      // })

      // console.log(file)
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
          <p>
            lastModifiedDate:{' '}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
        <button onClick={handleGet}>Get Test</button>
      </div>
      <img
        src={returnedGetUrl}
      />
    </div>
  )
}
