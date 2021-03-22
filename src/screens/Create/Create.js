import React, { useState } from "react";
import styles from "./styles.module.css";
import FileLoader from "../../components/FileLoader";

const Create = (props) => {
  const [dragging, setDragging] = useState(false); // to show a dragging effect
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(""); // to show an error message

  function handleFileDragEnter(e) {
    setDragging(true);
  }
  function handleFileDragLeave(e) {
    setDragging(false);
  }
  function handleFileDrop(e) {
    if (e.dataTransfer.types.includes("Files") === false) {
      return;
    }
    if (e.dataTransfer.files.length >= 1) {
      let file = e.dataTransfer.files[0];
      if (file.size > 1000000) {
        // larger than 1 MB
        return;
      }
      if (file.type.match(/image.*/)) {
        let reader = new FileReader();
        reader.onloadend = (e) => {
          // TODO: call setPhoto with e.target.result (this is a Base64 image string)
          setPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
    setDragging(false);
  }
  function handleDescChange(e) {
    setDesc(e.target.value);
  }
  function handleSubmit(e) {
    // TODO:
    // 1. Prevent default behavior
    e.preventDefault();
    // 2. Show error msg if failed and exit
    if (photo === null || desc === "") {
      setError("Please add photo and description");
      return;
    }

    // 3. Call the storage update function passed from the parent
    props.onSubmit(photo, desc);
    // 3. Clear error msg
    setError("");
  }
  function handleCancel() {
    // TODO: Notify the parent about the cancellation
    props.onCancel();
  }
  return (
    <div>
      <div className={styles.photo}>
        {!photo ? (
          <div className={styles.message}>Drop your image</div>
        ) : (
          <img src={photo} alt="New Post" />
        )}
        <FileLoader
          onDragEnter={handleFileDragEnter}
          onDragLeave={handleFileDragLeave}
          onDrop={handleFileDrop}
        >
          <div
            className={[
              styles.dropArea,
              dragging ? styles.dragging : null
            ].join(" ")}
          ></div>
        </FileLoader>
      </div>
      <div className={styles.desc}>
        <textarea
          placeholder="Add description"
          value={desc}
          onChange={handleDescChange}
        />
      </div>
      <div className={styles.error}>
        <p>{error}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Share</button>
      </div>
    </div>
  );
};

export { Create };
