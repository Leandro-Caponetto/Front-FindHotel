import React, { useState, useEffect } from "react";
import CreateHotel from "../CreateHotel/CreateHotel";
import BarChart from "./Barchart";
import styles from "./RenderDashboard.module.css";
import Table from "react-bootstrap/Table";
import EditableRow from "./Editable/EditableRow";
import DataReserve from "./DataReserve/DataReserve";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import Guest from "./Guest/Guest";
import { FaEdit, FaTrash } from "react-icons/fa";
import { index } from "d3-array";

const RenderView = ({ selectedView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [originalData, setOriginalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    country: "",
    phone: "",
  });

  const setEditedRow = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const initialData = {
    id: 1,
    firstName: "Micaela",
    lastName: "Otto",
    username: "@mdo",
    country: "Argentina",
    age: "26",
    email: "mdo@example.com",
    phone: "123-456-7890",
  };

  const fecthData = async () => {
    await fetch(
      "https://backendfindhotel-dev.fl0.io/user/64effefa6a31af53b08ef778"
    )
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);
        setOriginalData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          age: userData.age,
          country: userData.country,
          phone: userData.phone,
        });
      })
      .catch((error) => {
        console.error("Error al obtener la información del usuario:", error);
      });
  };

  useEffect(() => {
    fecthData();
  }, []);

  const handleEdit = () => {
    if (isEditing) {
      // onEdit(index, editedData);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = (index) => {

  };
  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en el backend
    // Por ahora, simplemente actualizaremos el estado originalData con los datos editados
    setOriginalData({
      ...originalData,
      ...editedData,
    });

    // Luego, desactivamos el modo de edición
    setIsEditing(false);
  };

  switch (selectedView) {
    case "statistics":
      return (
        <div>
          <h1 className={styles.title}>Welcome</h1>
          <h1 className={styles.h1}>customer registration data</h1>
          <h2>Data</h2>
          <div className={styles.card}>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Country</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(originalData).map((values, index) =>
                  [
                    "firstName",
                    "lastName",
                    "country",
                    "age",
                    "email",
                    "phone",
                  ].includes(values[0]) ? (
                    <td key={index}>
                      {isEditing && values[0] !== "email" ? (
                        <input className={styles.in}
                          type="text"
                          name={values[0]}
                          value={editedData[values[0]] || values[1]}
                          onChange={(e) => setEditedRow(e)}
                        />
                      ) : (
                        values[1]
                      )}
                    </td>
                  ) : null
                )}
                <td>
                  {isEditing ? (
                    <div className={styles.btn}>
                      <button onClick={handleSave}>
                        Save
                      </button>
                      <button
                        className={styles.trash} onClick={() => setIsEditing(false)}>
                        <FaTrash /> Delete</button>
                    </div>
                  ) : (
                    < div className={styles.btn}>
                      <button onClick={handleEdit}>
                        <FaEdit /> Edit
                      </button>
                      <button className={styles.trash} onClick={handleDelete}>
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tbody>
            </Table>
          </div>
        </div>
      );
    case "sales":
      return (
        <div>
          <h1 className={styles.title}>Reservation Control</h1>
          <h1 className={styles.h1}>booking record</h1>
          <DataReserve />
        </div>
      );
    case "hotel":
      return (
        <div className={styles.todo}>
          <h1 className={styles.title}>Payment Data</h1>
          <h1 className={styles.h1}>
            Add the payment method to speed up the booking process
          </h1>
          <PaymentMethod />
        </div>
      );
    case "rooms":
      return (
        <div className={styles.todo}>
          <h1 className={styles.title}>Guest Data</h1>
          <h1 className={styles.h1}>Add or edit information about guests</h1>
          <Guest />
        </div>
      );
    default:
      return null;
  }
};

export default RenderView;
