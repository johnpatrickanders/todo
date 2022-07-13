import { useState } from 'react';

export default function ({
  fileName
}) {
  const [imgSrc, setImgSrc] = useState("...");
  const handleShowDialog = () => {
    console.log("handle... ", fileName)
  };
  return (
    <div>
      <dialog
        className="dialog"
        style={{ position: 'absolute' }}
        open
        onClick={handleShowDialog}
      >
        <img
          className="image"
          src={imgSrc}
          onClick={handleShowDialog}
          alt="no image"
        />
      </dialog>
    </div>
  );
}
