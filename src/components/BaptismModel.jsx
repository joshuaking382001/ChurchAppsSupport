import { useState } from "react";
// Material UI components
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Textarea } from "@mui/joy";

// CSS import
import "./modelstyles.css";
import { useNavigate } from "react-router-dom";

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

const Baptism = ({ baptismModel, setBaptismModel }) => {
  const navigate = useNavigate()

  
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBaptism, setDateOfBaptism] = useState("");
  const [placeOfBaptism, setPlaceOfBaptism] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [residence, setResidence] = useState("");
  const [caste, setCaste] = useState("");
  const [godFather, setGodFather] = useState("");
  const [godMother, setGodMother] = useState("");
  const [Minister, setMinister] = useState("");
  const [textArea, setTextArea] = useState("");
  const [date,setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      sex,
      dateOfBirth,
      placeOfBirth,
      dateOfBaptism,
      placeOfBaptism,
      fatherName,
      motherName,
      residence,
      caste,
      godFather,
      godMother,
      Minister,
      textArea,
      date,
    };
    try {
      const response = await fetch('http://localhost/api/baptism.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseText = await response.text(); // Get the raw response text
      try {
        const result = JSON.parse(responseText); // Attempt to parse it as JSON
        console.log(result.message);
  
        if (result.id) {
          navigate(`/BaptismCertificate/${result.id}`);
        } else {
          console.error('Failed to get ID from response');
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Response text:', responseText); // Log the raw response text
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleClose = () => setBaptismModel(false);

  return (
    <div>
      <Modal
        open={baptismModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Baptism Certificate
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="Name"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="sex"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Sex
                    </label>
                    <input
                      type="text"
                      id="sex"
                      name="sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="Date"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="input"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="placeofbirth"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Place Of Birth
                    </label>
                    <input
                      type="text"
                      id="placeofbirth"
                      name="placeofbirth"
                      className="input"
                      value={placeOfBirth}
                      onChange={(e) => setPlaceOfBirth(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="dateofbaptism"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Date Of Baptism
                    </label>
                    <input
                      type="date"
                      id="dateofbaptism"
                      name="dateofbaptism"
                      className="input"
                      value={dateOfBaptism}
                      onChange={(e) => setDateOfBaptism(e.target.value)}
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="placeofbaptism"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Place Of Baptism
                    </label>
                    <input
                      type="text"
                      id="placeofbaptism"
                      name="placeofbaptism"
                      className="input"
                      value={placeOfBaptism}
                      onChange={(e) => setPlaceOfBaptism(e.target.value)}
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="fatherName"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Father Name
                    </label>
                    <input
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      className="input"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="motherName"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Mother Name
                    </label>
                    <input
                      type="text"
                      id="motherName"
                      name="motherName"
                      className="input"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="residence"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Residence Of Parents
                    </label>
                    <input
                      type="text"
                      id="residence"
                      name="residence"
                      className="input"
                      value={residence}
                      onChange={(e) => setResidence(e.target.value)}
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="caste"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Caste
                    </label>
                    <input
                      type="text"
                      id="caste"
                      name="caste"
                      className="input"
                      value={caste}
                      onChange={(e) => setCaste(e.target.value)}
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="godfather"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Godfather Name
                    </label>
                    <input
                      type="text"
                      id="godfather"
                      name="godfather"
                      className="input"
                      value={godFather}
                      onChange={(e) => setGodFather(e.target.value)}
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="godmother"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      GodMother Name
                    </label>
                    <input
                      type="text"
                      id="godmother"
                      name="godmother"
                      className="input"
                      value={godMother}
                      onChange={(e) => setGodMother(e.target.value)}
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="minister"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Minister
                    </label>
                    <input
                      type="text"
                      id="minister"
                      name="minister"
                      className="input"
                      value={Minister}
                      onChange={(e) => setMinister(e.target.value)}
                    />
                  </div>
                  
                  <div className="keptAtChilde">
                    <label
                      htmlFor="textarea"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Remarks
                    </label>
                    <Textarea
                      id="textarea"
                      name="textarea"
                      placeholder="Remarks"
                      value={textArea}
                      onChange={(e) => setTextArea(e.target.value)}
                      minRows={2}
                      maxRows={2}
                    />
                  </div>
                </div>
                <div className="keptAtChilde">
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
                  </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Baptism;
