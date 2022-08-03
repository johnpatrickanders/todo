import { useState, useEffect } from 'react';

export default function ({
  fileName,
  setOpen
}) {
  const [imgSrc, setImgSrc] = useState("");
  const handleShowDialog = (e) => {
    e.stopPropagation();
    setOpen(false)
  };
  useEffect(() => {
    const getPresignedUrl = async () => {
      const res = await fetch(`/sign_s3_get/${fileName}`);
      if (res.ok) {
        const data = await res.json();
        setImgSrc(data.url);
      };
    }
    getPresignedUrl();
  }, [])
  return (
    <div style={{
      display: 'flex',
      bottom: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: 'center', alignItems: 'center',
      position: 'fixed',
      top: '-50%',
      left: '-50%',
      zIndex: '1000'
    }}
      onClick={handleShowDialog}
    >
      <div style={{
        position: 'fixed',
        top: '9%',
        right: '9%',
        fontSize: '60px',
        color: 'red',
        fontWeight: 'bold',
        margin: 'auto'
      }}
      >
        X
      </div>
      <div
        style={{
          display: 'flex',
          position: "fixed",
          top: '50%',
          // bottom: 0,
          left: '700px',
          // right: 0,
          marginBlockStart: '9%',
          // marginLeft: 0,
          // marginRight: 0,
          width: '20vw',
          height: '20vh',
          marginLeft: '-20vw',
          marginTop: '-10vh',
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyItems: 'center',
          alignItems: 'center'
        }}>
        <img
          src={imgSrc}
          style={{
            flex: 1,
            maxWidth: '75vh',
            maxHeight: '75vh',
          }}
          alt="no image"
        />
      </div>
    </div >
  );
}
