// const fs = require("fs");
// const path = require("path");

// // Generate unique ID with current date and time
// const generateUniqueId = () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = String(now.getMonth() + 1).padStart(2, "0");
//   const day = String(now.getDate()).padStart(2, "0");
//   const hours = String(now.getHours()).padStart(2, "0");
//   const minutes = String(now.getMinutes()).padStart(2, "0");
//   const seconds = String(now.getSeconds()).padStart(2, "0");

//   return `id-${year}${month}${day}-${hours}${minutes}${seconds}`;
// };

// const dataDirectory = path.join(process.cwd(), "data");

// export const ensureDirectoryExists = () => {
//   if (!fs.existsSync(dataDirectory)) {
//     fs.mkdirSync(dataDirectory, { recursive: true });
//   }
// };

// export const ensureFileExists = (fileName) => {
//   ensureDirectoryExists();
//   const filePath = path.join(dataDirectory, fileName);
//   if (!fs.existsSync(filePath)) {
//     fs.writeFileSync(filePath, JSON.stringify([]));
//   }
//   return filePath;
// };

// export const readData = (fileName) => {
//   const filePath = ensureFileExists(fileName);
//   const fileContent = fs.readFileSync(filePath, "utf-8");
//   return JSON.parse(fileContent);
// };

// export const writeData = (fileName, data) => {
//   const filePath = ensureFileExists(fileName);
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };

// export const addUniqueId = (data) => {
//   data["id"] = generateUniqueId();
//   return data;
// };

// export const updateData = (fileName, id, newData) => {
//   console.log("Anitha",fileName,id)
//   const data = readData(fileName);
//   const updatedData = data.map((item) =>
//     item.id === id ? { ...item, ...newData } : item
//   );
//   writeData(fileName, updatedData);
// };

// export const deleteData = (fileName, id) => {
//   const data = readData(fileName);
//   const filteredData = data.filter((item) => item.id !== id);
//   writeData(fileName, filteredData);
// };
