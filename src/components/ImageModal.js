import { useState, useEffect } from 'react';

export default function ({
  fileName
}) {
  const [imgSrc, setImgSrc] = useState("...");
  const handleShowDialog = (e) => {
    e.preventDefault();

    console.log("handle... ", fileName)
  };
  useEffect(() => {
    const getPresignedUrl = async () => {
      const res = await fetch(`/sign_s3_get/${fileName}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setImgSrc(data.url);
      };
    }
    getPresignedUrl();
  }, [])
  return (
    <div style={{
      display: 'flex',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: 'center', alignItems: 'center',
      position: 'fixed',
      top: '-50%',
      left: '-50%',
      zIndex: '1000'
    }}>
      <dialog
        className="dialog"
        // style={{ position: 'absolute' }}
        open
        onClick={e => handleShowDialog(e)}
      >
        <div
          // onClick={() => setImgSrc({ showmodal: false })}
          style={{
            display: 'flex',
            position: "absolute",
            // overflow: 'visible',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '50vw',
            height: '50vw',
            // overflowY: '50%',
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: 'center', alignItems: 'center'
          }}>
          <img
            // className="image"
            src={imgSrc}
            style={{
              flex: 1,
              maxWidth: '75vh',
              maxHeight: '75vh',
            }}
            onClick={handleShowDialog}
            alt="no image"
          />
        </div>
      </dialog>
    </div>
  );
}
