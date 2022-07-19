import { useState, useEffect } from 'react';
import fetcher from './fetcher';

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
      const res = await fetcher(`/sign_s3_get/${fileName}`);
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
      <dialog
        className="dialog"
        style={{ position: 'absolute' }}
        open
      >
        <div style={{
          position: 'fixed',
          top: '8%',
          right: '8%',
          fontSize: '60px',
          color: 'red',
          fontWeight: 'bold'
        }}
        >
          X
        </div>
        <div
          style={{
            display: 'flex',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '50vw',
            height: '50vw',
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: 'center', alignItems: 'center'
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
      </dialog>
    </div>
  );
}
