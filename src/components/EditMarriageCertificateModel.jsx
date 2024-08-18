"use client";
import { useState } from "react";
import { useSaveData } from "../app/hooks/useSaveData";
//tabs
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
// model
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Textarea from "@mui/joy/Textarea";
import "./modelstyles.css"
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

const EditMarriageCertificateModel=({editcertificate,setEditCertificate,data,fetchData}) => {
  const navigate = useNavigate()
  console.log("data", data)
  // const router = useRouter();
  const { saveData } = useSaveData();
  const [textArea, setTextArea] = useState(data.textArea || "");
  const [placeOfMarriage, setPlaceOfMarriage] = useState(data.placeOfMarriage || "");
  const [dateofmarriage, setDateOfMarriage] = useState(data.dateofmarriage || "");
  const [groomChristianName, setGroomChristianName] = useState(data.groomChristianName || "");
  const [groomsurName, setGroomSurName] = useState(data.groomsurName || "");
  const [groomage, setGroomAge] = useState(data.groomage || "");
  const [groomcondition, setGroomCondition] = useState(data.groomcondition || "");
  const [groomrank, setGroomRank] = useState(data.groomrank || "");
  const [groomresidence, setGroomResidence] = useState(data.groomresidence || "");
  const [groomfatherName, setGroomFatherName] = useState(data.groomfatherName || "");
  const [groommotherName, setGroomMotherName] = useState(data.groommotherName || "");
  const [groomfirstWitness, setGroomFirstWitness] = useState(data.groomfirstWitness || "");
  const [groomsecondWitness, setGroomSecondWitness] = useState(data.groomsecondWitness || "");
  const [brideChristianName, setBrideChristianName] = useState(data.brideChristianName || "");
  const [brideSurName, setBrideSurName] = useState(data.brideSurName || "");
  const [brideage, setBrideAge] = useState(data.brideage || "");
  const [brideCondition, setBrideCondition] = useState(data.brideCondition || "");
  const [brideRank, setBrideRank] = useState(data.brideRank || "");
  const [brideResidence, setBrideResidence] = useState(data.brideResidence || "");
  const [brideFatherName, setBrideFatherName] = useState(data.brideFatherName || "");
  const [brideMotherName, setBrideMotherName] = useState(data.brideMotherName || "");
  const [brideFirstWitness, setBrideFirstWitness] = useState(data.brideFirstWitness || "");
  const [brideSecondWitness, setBrideSecondWitness] = useState(data.brideSecondWitness || "");
  const [ceremony, setCeremony] = useState(data.ceremony || "");
  const [date, setDate] = useState(data.date || "");
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      textArea,
      placeOfMarriage,
      dateofmarriage,
      groomChristianName,
      groomsurName,
      groomage,
      groomcondition,
      groomrank,
      groomresidence,
      groomfatherName,
      groommotherName,
      groomfirstWitness,
      groomsecondWitness,
      brideChristianName,
      brideSurName,
      brideage,
      brideCondition,
      brideRank,
      brideResidence,
      brideFatherName,
      brideMotherName,
      brideFirstWitness,
      brideSecondWitness,
      ceremony,
      date,
      id:data.id,
    };
    try {
      const response = await fetch('http://localhost/api/marriagec.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
  
      const result = await response.json();
      console.log('API response:', result); // Log the full response
  
      if (result.id) {
        navigate(`/MarriageCertificate/${result.id}`);
      } else {
        console.error('Failed to get ID from response');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => setEditCertificate(false);

 
  return (
    <>
      <div>
        <Modal
          open={editcertificate}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
              <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Marriage Certificate
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="keptAttextarea mb-4">
                    <label htmlFor="keptAt" className="text-gray-700 font-bold">
                      KEPT AT
                    </label>
                    <Textarea
                      className="textarea"
                      minRows={2}
                      placeholder="Type anything…"
                      value={textArea}
                      onChange={(e) => setTextArea(e.target.value)}
                    />
                  </div>

                  <div className="keptAt mb-4">
                    <div className="keptAtChilde">
                      <label
                        htmlFor="placeOfMarriage"
                        className="text-gray-700 font-bold mb-2 ml-2"
                      >
                        Place Of Marriage
                      </label>
                      <input
                        type="text"
                        id="placeOfMarriage"
                        name="placeOfMarriage"
                        className="input"
                        value={placeOfMarriage}
                        onChange={(e) => setPlaceOfMarriage(e.target.value)}
                      />
                    </div>
                    <div className="keptAtChilde">
                      <label
                        htmlFor="dateOfMarriage"
                        className="text-gray-700 font-bold mb-2 ml-2"
                      >
                        Date Of Marriage
                      </label>
                      <input
                        type="date"
                        id="dateOfMarriage"
                        name="date"
                        className="input"
                        value={dateofmarriage}
                        onChange={(e) => setDateOfMarriage(e.target.value)}
                      />
                    </div>
                  </div>
                  <Tabs aria-label="Basic tabs" defaultValue={0}>
                    <TabList>
                      <Tab>BRIDEGROOM</Tab>
                      <Tab>BRIDE</Tab>

                    </TabList>
                    <TabPanel value={0}>
                      <div className="keptAt">
                        <div className="keptAtChilde">
                          <label htmlFor="christianName" className="text-gray-700 font-bold">
                            Christian Name
                          </label>
                          <input
                            type="text"
                            id="christianName"
                            name="christianName"
                            className="input"
                            value={groomChristianName}
                            onChange={(e) => setGroomChristianName(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="surname"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Surname / Common Name
                          </label>
                          <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="input"
                            value={groomsurName}
                            onChange={(e) => setGroomSurName(e.target.value)}
                          />
                        </div>

                        <div className="keptAtChilde">
                          <label htmlFor="age" className="text-gray-700 font-bold">
                            Age
                          </label>
                          <input
                            type="text"
                            id="age"
                            name="age"
                            className="input"
                            value={groomage}
                            onChange={(e) => setGroomAge(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="condition"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Condition
                          </label>
                          <input
                            type="text"
                            id="condition"
                            name="condition"
                            className="input"
                            value={groomcondition}
                            onChange={(e) => setGroomCondition(e.target.value)}
                          />
                        </div>

                        <div className="keptAtChilde">
                          <label htmlFor="rank" className="text-gray-700 font-bold">
                            Rank of Profession
                          </label>
                          <input
                            type="text"
                            id="rank"
                            name="rank"
                            className="input"
                            value={groomrank}
                            onChange={(e) => setGroomRank(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="residence"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Residence at the time of Marriage
                          </label>
                          <input
                            type="text"
                            id="residence"
                            name="residence"
                            className="input"
                            value={groomresidence}
                            onChange={(e) => setGroomResidence(e.target.value)}
                          />
                        </div>

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
                            value={groomfatherName}
                            onChange={(e) => setGroomFatherName(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label htmlFor="motherName" className="text-gray-700 font-bold">
                            Mother Name
                          </label>
                          <input
                            type="text"
                            id="motherName"
                            name="motherName"
                            className="input"
                            value={groommotherName}
                            onChange={(e) => setGroomMotherName(e.target.value)}
                          />
                        </div>
                        {/* <h1 className="heading">Name of Witness with Address</h1> */}
                        <div className="keptAtChilde">
                          <label htmlFor="firstWitness" className="text-gray-700 font-bold">
                            First Witness
                          </label>
                          <Textarea
                            minRows={3}
                            placeholder="Enter Name and Address"
                            className="textarea"
                            value={groomfirstWitness}
                            onChange={(e) => setGroomFirstWitness(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="secondWitness"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Second Witness
                          </label>
                          <Textarea
                            minRows={3}
                            placeholder="Enter Name and Address"
                            className="textarea"
                            value={groomsecondWitness}
                            onChange={(e) => setGroomSecondWitness(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value={1}>
                      <div className="keptAt">
                        <div className="keptAtChilde">
                          <label htmlFor="christianName" className="text-gray-700 font-bold">
                            Christian Name
                          </label>
                          <input
                            type="text"
                            id="christianName"
                            name="christianName"
                            className="input"
                            value={brideChristianName}
                            onChange={(e) => setBrideChristianName(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="surname"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Surname / Common Name
                          </label>
                          <input
                            type="text"
                            id="surname"
                            name="surname"
                            className="input"
                            value={brideSurName}
                            onChange={(e) => setBrideSurName(e.target.value)}
                          />
                        </div>

                        <div className="keptAtChilde">
                          <label htmlFor="age" className="text-gray-700 font-bold">
                            Age
                          </label>
                          <input
                            type="text"
                            id="age"
                            name="age"
                            className="input"
                            value={brideage}
                            onChange={(e) => setBrideAge(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="condition"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Condition
                          </label>
                          <input
                            type="text"
                            id="condition"
                            name="condition"
                            className="input"
                            value={brideCondition}
                            onChange={(e) => setBrideCondition(e.target.value)}
                          />
                        </div>

                        <div className="keptAtChilde">
                          <label htmlFor="rank" className="text-gray-700 font-bold">
                            Rank of Profession
                          </label>
                          <input
                            type="text"
                            id="rank"
                            name="rank"
                            className="input"
                            value={brideRank}
                            onChange={(e) => setBrideRank(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="residence"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Residence at the time of Marriage
                          </label>
                          <input
                            type="text"
                            id="residence"
                            name="residence"
                            className="input"
                            value={brideResidence}
                            onChange={(e) => setBrideResidence(e.target.value)}
                          />
                        </div>

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
                            value={brideFatherName}
                            onChange={(e) => setBrideFatherName(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label htmlFor="motherName" className="text-gray-700 font-bold">
                            Mother Name
                          </label>
                          <input
                            type="text"
                            id="motherName"
                            name="motherName"
                            className="input"
                            value={brideMotherName}
                            onChange={(e) => setBrideMotherName(e.target.value)}
                          />
                        </div>
                        {/* <h1 className="heading">Name of Witness with Address</h1> */}
                        <div className="keptAtChilde">
                          <label htmlFor="firstWitness" className="text-gray-700 font-bold">
                            First Witness
                          </label>
                          <Textarea
                            minRows={3}
                            placeholder="Enter Name and Address"
                            className="textarea"
                            value={brideFirstWitness}
                            onChange={(e) => setBrideFirstWitness(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="secondWitness"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Second Witness
                          </label>
                          <Textarea
                            minRows={3}
                            placeholder="Enter Name and Address"
                            className="textarea"
                            value={brideSecondWitness}
                            onChange={(e) => setBrideSecondWitness(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabPanel>

                  </Tabs>
                  <label>Name of the Minister by whom the <br /> Ceremony is performed:</label>
                  <input   type="text"
                            id="rank"
                            name="rank"
                            className="input"
                            value={ceremony}
                            onChange={(e) => setCeremony(e.target.value)} />
                             <div className="keptAtChilde">
                    <label
                      htmlFor="dateOfMarriage"
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
                  <button
                    type="submit"
                    style={{ float: "right", margin: "10px" }}
                    className=" w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
export default EditMarriageCertificateModel;