import React, { useEffect, useState } from "react";
import EditLetterPad from "./EditLetterPad";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const LetterPadDetails = ({ pickDate }) => {
  const navigate = useNavigate();

  // Function to format date string or return current date
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return dayjs().format('DD-MM-YYYY'); // Return current date if dateString is invalid or empty
    const [year, month, day] = dateString.split("-");
    if (day && month && year) {
      return `${day}-${month}-${year}`;
    }
    return dayjs().format('DD-MM-YYYY'); // Default to current date if parsing fails
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let result = data;

    // Filter by selected date (year and month)
    if (pickDate) {
      const selectedMonth = dayjs(pickDate).format("MM-YYYY");
      result = result.filter((val) => {
        const dateField = formatDateForDisplay(val.date);
        if (dateField) {
          const formattedDate = dayjs(dateField, 'DD-MM-YYYY').format("MM-YYYY");
          return formattedDate === selectedMonth;
        }
        return false;
      });
    }

    setFilteredData(result);
  }, [pickDate, data]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost/api/letterpad.php");
      const result = await response.json();
  
      console.log('API Response:', result); // Debugging line
  
      // Ensure the data is an array
      const sortedData = Array.isArray(result) ? result : [];
  
      // Sort the data in descending order based on the id field
      sortedData.sort((a, b) => b.id - a.id);
  
      setData(sortedData);
    } catch (error) {
      console.error("Failed to fetch data", error);
      setData([]); // Fallback to an empty array in case of an error
    }
  };
  
  

  useEffect(() => {
    fetchData();
  }, []);

  const [editLetter, setEditLetter] = useState(false);
  const [editdata, setEditData] = useState();

  const handleView = (id) => {
    console.log("View data with ID:", id);
    navigate(`/LatterPad/${id}`);
  };

  const handleEdit = async (data) => {
    console.log("Edit data with ID:", data);
    setEditData(data);
    setEditLetter(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await fetch('http://localhost/api/letterpad.php', {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        // Remove deleted item from state
        setData(data.filter((item) => item.id !== id));
        setFilteredData(filteredData.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Failed to delete data", error);
      }
    }
  };

  return (
    <>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sl. No</th>
            <th className="py-2 px-4 border-b">Date of Register</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 &&
            filteredData.map((val, idx) => (
              <tr key={idx}>
                <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                <td className="py-2 px-4 border-b text-center">
                  {formatDateForDisplay(val.date)}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleView(val.id)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(val)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(val.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editdata && (
        <EditLetterPad
          editLetter={editLetter}
          setEditLetter={setEditLetter}
          data={editdata}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

export default LetterPadDetails;
