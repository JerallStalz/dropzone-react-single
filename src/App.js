import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function App() {
  const [files, setFiles] = useState([]);
  const [pathImage, setPathImage] = useState();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const image = acceptedFiles[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function load() {
        setPathImage(reader.result);
      };
      setFiles(image);
    }
  });

  

  const sendImage = (e) => {
    e.preventDefault();
    axios.post(/*ServerUrl*/, { file: files, name: "manolo" });
  };

  return (
    <div className="App">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Deje caer un arcivo aqui</p>
      </div>
      <div>
        <img src={pathImage} />
      </div>
      <button onClick={sendImage}>Enviar</button>
    </div>
  );
}
