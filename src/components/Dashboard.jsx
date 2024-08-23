import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import logo from "../app/img/logo.png";
import MarriageFormModel from "./FormModel"
import MarriageCertificateModel from "./MarriageCertificateModel";
import BaptismModel from "./BaptismModel";
import EditMarriageCertificateModel from "./EditMarriageCertificateModel";
import BaptismDetails from "./BaptismDetails";
import MarriageDetails from "./MarriageDetails";
import MarriageCertificateDetail from "./MarriageCertificateDetail";
import LetterPadDetails from "./LetterPadDetails";
import LetterPadModel from "./LetterPadModel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "#000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const [option, setOption] = useState("");
  const tabs = ["Baptism", "Marriage Form", "Marriage Certificate", "Letter Pad"];
  const [tabActive, setTabActive] = useState("Baptism");
  const [open, setOpen] = useState(false);
  const [marriage, setMarriage] = useState(false);
  const [baptismModel, setBaptismModel] = useState(false);
  const [marriageForm, setMarriageForm] = useState(false);
  const [letterPad, setLetterPad] = useState(false);
  const [editmarriagecertificate, setEditMarriageCertificate] = useState(false);
  const [editdata, setEditData] = useState();
  const [search, setSearch] = useState("");
  const [pickDate, setPickDate] = useState();

  const renderPage = () => {
    switch (tabActive) {
      case "Baptism":
        return <BaptismDetails search={search} pickDate={pickDate} />;
      case "Marriage Form":
        return <MarriageDetails search={search} pickDate={pickDate} />;
      case "Marriage Certificate":
        return <MarriageCertificateDetail search={search} pickDate={pickDate} />;
      case "Letter Pad":
        return <LetterPadDetails pickDate={pickDate} />;
      default:
        return null;
    }
  };

  const handleChange = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption);
    switch (selectedOption) {
      case "MarriageCertificate":
        setMarriage(true);
        break;
      case "BaptismCertificate":
        setBaptismModel(true);
        break;
      case "MarriageForm":
        setMarriageForm(true);
        break;
      case "LetterPad":
        setLetterPad(true);
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <main>
      <div className="container mx-auto p-4 text-black bg-white ">
        <div className="flex items-center mb-4">
          <img src={logo} alt="Logo" className="h-32 w-36" />
          <h1 className="text-5xl font-bold text-black ml-4">St. Antony's Church</h1>
          <button
            className="ml-auto bg-blue-500 text-white px-2 py-1 rounded"
            onClick={handleOpen}
          >
            Add New
          </button>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="rounded-lg flex-grow">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Name..."
              className="px-3 py-2 border-none rounded-lg w-2/5 focus:outline-none"
            />
          </div>
          <div className="ml-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label='"month" and "year"'
                  views={["month", "year"]}
                  value={pickDate}
                  onChange={(e) => setPickDate(e)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <div className="flex gap-2 justify-center mt-4">
          {tabs.map((val, idx) => (
            <button
              key={idx}
              onClick={() => setTabActive(val)}
              className={`border rounded-xl p-2 mb-5 ${
                val === tabActive ? "bg-blue-300 text-black" : "text-black"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        {renderPage()}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="select-type-label">Select Type</InputLabel>
            <Select
              labelId="select-type-label"
              id="select-type"
              value={option}
              label="Select Page"
              onChange={handleChange}
              className="bg-white"
            >
              <MenuItem value="MarriageCertificate">Marriage Certificate</MenuItem>
              <MenuItem value="BaptismCertificate">Baptism Certificate</MenuItem>
              <MenuItem value="MarriageForm">Marriage Form</MenuItem>
              <MenuItem value="LetterPad">Letter Pad</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Modal>

      {marriage && (
        <MarriageCertificateModel
          marriage={marriage}
          setMarriage={setMarriage}
        />
      )}

      {editdata && (
        <EditMarriageCertificateModel
          editmarriagecertificate={editmarriagecertificate}
          setEditMarriageCertificate={setEditMarriageCertificate}
          editData={editdata}
        />
      )}

      {baptismModel && (
        <BaptismModel
          baptismModel={baptismModel}
          setBaptismModel={setBaptismModel}
        />
      )}

      {marriageForm && (
        <MarriageFormModel
          marriageForm={marriageForm}
          setMarriageForm={setMarriageForm}
        />
      )}

      {letterPad && (
        <LetterPadModel
          letterPad={letterPad}
          setLetterPad={setLetterPad}
        />
      )}
    </main>
  );
}
