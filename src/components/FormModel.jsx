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
import img from '../app/img/mform.jpg'
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

const MarriageFormModel = ({ marriageForm, setMarriageForm }) => {
  const navigate = useNavigate()

  const [refno, setRefNo] = useState("");
  const [date, setDate] = useState("");
  const [parish, setParish] = useState("");
  const [yourRefNo, setYourRefNo] = useState("");
  const [impediment, setImpediment] = useState("");
  const [banns, setBanns] = useState("");
  const [bannsSecond, setBannsSecond] = useState("");
  const [bannsThird, setBannsThird] = useState("");
  const [celebration, setCelebration] = useState("");
  const [format, setFormAt] = useState("");
  const [mr, setMr] = useState("");
  const [soneOf, setSonOf] = useState("");
  const [from, setFrom] = useState("");
  const [oftheparishof, setOfTheParishOf] = useState("");
  const [dioces, setDioces] = useState("");
  const [globalDioces, setGlobalDioces] = useState("")
  const [bornOn, setBornOn] = useState("");
  const [baptized, setBaptized] = useState("");
  const [on, setOn] = useState("");
  const [daughterwith, setDaughterWith] = useState("");
  const [daughterOf, setDaughterOf] = useState("");
  const [daughterfrom, setDaughterFrom] = useState("");
  const [daughteroftheparishof, setDaughterOfTheParishOf] = useState("");
  const [daughterdioces, setDaughterDioces] = useState("");
  const [daughterbornOn, setDaughterBornOn] = useState("");
  const [daughterbaptized, setDaughterBaptized] = useState("");
  const [daughteron, setDaughterOn] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      refno,
      date,
      parish,
      yourRefNo,
      impediment,
      banns,
      bannsSecond,
      bannsThird,
      celebration,
      format,
      mr,
      soneOf,
      from,
      oftheparishof,
      dioces,
      globalDioces,
      bornOn,
      baptized,
      on,
      daughterwith,
      daughterOf,
      daughterfrom,
      daughteroftheparishof,
      daughterdioces,
      daughterbornOn,
      daughterbaptized,
      daughteron
    };

    try {
      const response = await fetch('http://localhost/api/marriageform.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();
      try {
        const result = JSON.parse(responseText);
        console.log(result.message);

        if (result.id) {
          navigate(`/MarriageForm/${result.id}`);
        } else {
          console.error('Failed to get ID from response');
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Response text:', responseText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
};

// Example of additional validation before submitting the form
const validateForm = () => {
  if (!refno || !date || !parish || !yourRefNo) {
    console.error('Required fields are missing');
    return false;
  }
  return true;
};

  
  const handleClose = () => setMarriageForm(false);

  return (
    <div>
      <Modal
        open={marriageForm}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Marriage Form
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="refno"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Our Ref.No
                    </label>
                    <input
                      type="text"
                      id="refno"
                      name="refno"
                      className="input"
                      required
                      value={refno}
                      onChange={(e) => setRefNo(e.target.value)}
                    />
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
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="parish"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Parish
                    </label>
                    <input
                      type="text"
                      id="parish"
                      name="parish"
                      className="input"
                      required
                      value={parish}
                      onChange={(e) => setParish(e.target.value)}
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="yourrefno"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Your Ref.No
                    </label>
                    <input
                      type="text"
                      id="date"
                      name="yourrefno"
                      className="input"
                      required
                      value={yourRefNo}
                      onChange={(e) => setYourRefNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="Dioces"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Dioces
                    </label>
                    <input
                      type="text"
                      id="dioces"
                      name="dioces"
                      className="input"
                      required
                      value={globalDioces}
                      onChange={(e) => setGlobalDioces(e.target.value)}
                    />
                  </div>
                </div>
                <img src={img} alt="form text" /><br/>

                <Tabs aria-label="Basic tabs" defaultValue={0}>
                  <TabList>
                    <Tab>Mr</Tab>
                    <Tab>With</Tab>
                  </TabList>
                  <TabPanel value={0}>
                    <div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label htmlFor="mr" className="text-gray-700 font-bold mb-2 ml-2">
                            Mr.
                          </label>
                          <input
                            type="text"
                            id="mr"
                            name="mr"
                            className="input"
                            required
                            value={mr}
                            onChange={(e) => setMr(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="sonOf"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Son Of
                          </label>
                          <input
                            type="text"
                            id="sonOf"
                            name="sonOf"
                            className="input"
                            required
                            value={soneOf}
                            onChange={(e) => setSonOf(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label htmlFor="from" className="text-gray-700 font-bold mb-2 ml-2">
                            From
                          </label>
                          <input
                            type="text"
                            id="from"
                            name="from"
                            className="input"
                            required
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="oftheparishof"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Of the parish of
                          </label>
                          <input
                            type="text"
                            id="oftheparishof"
                            name="oftheparishof"
                            className="input"
                            required
                            value={oftheparishof}
                            onChange={(e) => setOfTheParishOf(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label
                            htmlFor="dioces"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            In the Dioces of
                          </label>
                          <input
                            type="text"
                            id="dioces"
                            name="dioces"
                            className="input"
                            required
                            value={dioces}
                            onChange={(e) => setDioces(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="bornon"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Born On
                          </label>
                          <input
                            type="text"
                            id="bornon"
                            name="bornon"
                            className="input"
                            required
                            value={bornOn}
                            onChange={(e) => setBornOn(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label
                            htmlFor="baptized"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Baptized at
                          </label>
                          <input
                            type="text"
                            id="baptized"
                            name="baptized"
                            className="input"
                            required
                            value={baptized}
                            onChange={(e) => setBaptized(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label htmlFor="on" className="text-gray-700 font-bold mb-2 ml-2">
                            On
                          </label>
                          <input
                            type="text"
                            id="on"
                            name="on"
                            className="input"
                            required
                            value={on}
                            onChange={(e) => setOn(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={1}>
                    <div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label htmlFor="with" className="text-gray-700 font-bold mb-2 ml-2">
                            With
                          </label>
                          <input
                            type="text"
                            id="mr"
                            name="mr"
                            className="input"
                            required
                            value={daughterwith}
                            onChange={(e) => setDaughterWith(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="daughterOf"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Daughter Of
                          </label>
                          <input
                            type="text"
                            id="daughterOf"
                            name="daughterOf"
                            className="input"
                            required
                            value={daughterOf}
                            onChange={(e) => setDaughterOf(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label htmlFor="from" className="text-gray-700 font-bold mb-2 ml-2">
                            From
                          </label>
                          <input
                            type="text"
                            id="from"
                            name="from"
                            className="input"
                            required
                            value={daughterfrom}
                            onChange={(e) => setDaughterFrom(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="oftheparishof"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Of the parish of
                          </label>
                          <input
                            type="text"
                            id="oftheparishof"
                            name="oftheparishof"
                            className="input"
                            required
                            value={daughteroftheparishof}
                            onChange={(e) => setDaughterOfTheParishOf(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label
                            htmlFor="dioces"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            In the Dioces of
                          </label>
                          <input
                            type="text"
                            id="dioces"
                            name="dioces"
                            className="input"
                            required
                            value={daughterdioces}
                            onChange={(e) => setDaughterDioces(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label
                            htmlFor="bornon"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Born On
                          </label>
                          <input
                            type="text"
                            id="bornon"
                            name="bornon"
                            className="input"
                            required
                            value={daughterbornOn}
                            onChange={(e) => setDaughterBornOn(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="keptAt mb-4">
                        <div className="keptAtChilde">
                          <label
                            htmlFor="baptized"
                            className="text-gray-700 font-bold mb-2 ml-2"
                          >
                            Baptized at
                          </label>
                          <input
                            type="text"
                            id="baptized"
                            name="baptized"
                            className="input"
                            required
                            value={daughterbaptized}
                            onChange={(e) => setDaughterBaptized(e.target.value)}
                          />
                        </div>
                        <div className="keptAtChilde">
                          <label htmlFor="on" className="text-gray-700 font-bold mb-2 ml-2">
                            On
                          </label>
                          <input
                            type="text"
                            id="on"
                            name="on"
                            className="input"
                            required
                            value={daughteron}
                            onChange={(e) => setDaughterOn(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </Tabs>

                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="impediment"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Impediment
                    </label>
                    <input
                      type="text"
                      id="impediment"
                      name="impediment"
                      className="input"
                      required
                      value={impediment}
                      onChange={(e) => setImpediment(e.target.value)}
                    />
                  </div>
                </div>
                <div className="Bannsparant mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="with"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Banns Will be published in this parish on
                    </label>
                  </div>
                  <div className="Banns">
                    <input
                      type="text"
                      id="first"
                      name="first"
                      className="input"
                      placeholder="First"
                      value={banns}
                      onChange={(e) => setBanns(e.target.value)}
                    />
                    <input
                      type="text"
                      id="second"
                      name="second"
                      className="input"
                      placeholder="second"
                      value={bannsSecond}
                      onChange={(e) => setBannsSecond(e.target.value)}
                    />
                    <input
                      type="text"
                      id="third"
                      name="third"
                      className="input"
                      placeholder="Third"
                      value={bannsThird}
                      onChange={(e) => setBannsThird(e.target.value)}
                    />
                  </div>
                </div>
                <div className="keptAt mb-4">
                  <div className="keptAtChilde">
                    <label
                      htmlFor="celebration"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      Marriage is to celebrated on
                    </label>
                    <input
                      type="text"
                      id="celebration"
                      name="celebration"
                      className="input"
                      required
                      value={celebration}
                      onChange={(e) => setCelebration(e.target.value)}
                    />
                  </div>
                  <div className="keptAtChilde">
                    <label
                      htmlFor="at"
                      className="text-gray-700 font-bold mb-2 ml-2"
                    >
                      At
                    </label>
                    <input
                      type="text"
                      id="at"
                      name="at"
                      className="input"
                      required
                      value={format}
                      onChange={(e) => setFormAt(e.target.value)}
                    />
                  </div>
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
  );
};

export default MarriageFormModel;
