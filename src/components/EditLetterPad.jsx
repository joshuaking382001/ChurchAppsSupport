"use client";
import { useState } from "react";
import { useSaveData } from "../app/hooks/useSaveData";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  color: "#000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const EditLetterPad = ({ editLetter, setEditLetter, data, fetchData }) => {
  const { saveData } = useSaveData();
  const navigate = useNavigate(); // Use the useNavigate hook

  // Text area font style useStates
  const [fontStyle, setFontStyle] = useState(data.fontStyle || "normal");
  const [fontWeight, setFontWeight] = useState(data.fontWeight || "normal");
  const [fontSize, setFontSize] = useState(data.fontSize || "16px");
  const [textAlign, setTextAlign] = useState(data.textAlign || "left");
  const [textarea, setTextArea] = useState(data.textarea || "");
  const [date,setDate] = useState(data.date || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      fontStyle,
      fontWeight,
      fontSize,
      textAlign,
      textarea,
      date,
      id: data.id,
    };
  
    try {
      const response = await fetch('http://localhost/api/letterpad.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
  
      const result = await response.json();
      console.log('API response:', result); // Log the full response
  
      if (result.id) {
        navigate(`/LatterPad/${result.id}`);
      } else {
        console.error('Failed to get ID from response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleClose = () => setEditLetter(false);

  return (
    <div>
      <Modal
        open={editLetter}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="max-w-4xl mx-auto p-8">
              <h1 className="text-2xl font-bold mb-6">Text Editor</h1>

              <div className="mb-6">
                <label className="block mb-2">Font Style</label>
                <select
                  className="border p-2 rounded w-full"
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2">Font Weight</label>
                <select
                  className="border p-2 rounded w-full"
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="bolder">Bolder</option>
                  <option value="lighter">Lighter</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block mb-2">Font Size</label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={parseInt(fontSize, 10)}
                  onChange={(e) => setFontSize(`${e.target.value}px`)}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2">Text Alignment</label>
                <select
                  className="border p-2 rounded w-full"
                  value={textAlign}
                  onChange={(e) => setTextAlign(e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>

              <textarea
                className="w-full h-64 border rounded p-4"
                placeholder="Type here..."
                value={textarea}
                onChange={(e) => setTextArea(e.target.value)}
                style={{
                  fontStyle: fontStyle,
                  fontWeight: fontWeight,
                  fontSize: fontSize,
                  textAlign: textAlign,
                }}
              />
              <label
                      htmlFor="date"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />

              <button
                type="submit"
                style={{ float: "right", margin: "10px" }}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditLetterPad;
