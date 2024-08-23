import React, { useEffect, useState } from "react";
import EditBaptismModel from "./EditBaptismModel";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const BaptismDetails = ({ search, pickDate }) => {
  const navigate = useNavigate();

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return dayjs().format("DD-MM-YYYY");
    const [year, month, day] = dateString.split("-");
    if (day && month && year) {
      return `${day}-${month}-${year}`;
    }
    return dayjs().format("DD-MM-YYYY");
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const result = data.filter((val) => {
      const dateField = formatDateForDisplay(val.date);
      const selectedMonth = pickDate ? dayjs(pickDate).format("MM-YYYY") : "";
      const formattedDate = dateField
        ? dayjs(dateField, "DD-MM-YYYY").format("MM-YYYY")
        : "";

      const matchesDate = selectedMonth ? formattedDate === selectedMonth : true;
      const matchesSearch = search
        ? val.name.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchesDate && matchesSearch;
    });

    setFilteredData(result);
  }, [pickDate, search, data]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost/api/baptism.php");
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

  const [editbaptism, setEditBaptism] = useState(false);
  const [editdata, setEditData] = useState();

  const handleView = (id) => {
    console.log("View data with ID:", id);
    navigate(`/BaptismCertificate/${id}`);
  };

  const handleEdit = (data) => {
    console.log("Edit data with ID:", data);
    setEditData(data);
    setEditBaptism(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await fetch("http://localhost/api/baptism.php", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
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
            <th className="py-2 px-2 border-b">Sl. No</th>
            <th className="py-2 px-2 border-b">Name</th>
            <th className="py-2 px-2 border-b">Date of Register</th>
            <th className="py-2 px-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 &&
            filteredData.map((val, idx) => (
              <tr key={idx}>
                <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
                <td className="py-2 px-4 border-b text-center">{val.name}</td>
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
        <EditBaptismModel
          editbaptism={editbaptism}
          setEditBaptism={setEditBaptism}
          data={editdata}
          fetchData={fetchData}
        />
      )}
    </>
  );
};

export default BaptismDetails;
