import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './EditableRow.module.css';
import axios from "axios";

const EditableRow = ({ index, rowData, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [originalData, setOriginalData] = useState({});
 

  useEffect(() => {
    // Cargamos los datos originales cuando se monta el componente
    fetchHotel();
    
  }, []);
  
  const handleEdit = () => {
    if (isEditing) {
      onEdit(index, editedRow);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const fetchHotel = async () => {
    try {
      const response = await axios.get('https://backendfindhotel-dev.fl0.io/deals/user/64effefa6a31af53b08ef778');
      const data = response.data;
      console.log(data)
      setOriginalData(data);
      
      setEditedRow(data);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };
  console.log(fetchHotel.data)
  return (
    <tr>
      <td>{rowData.id}</td>
      <td>
        {isEditing ? (
          <input className={styles.in}
            type="text"
            value={editedRow.NameHotel || ""}
            onChange={(e) => setEditedRow({ ...editedRow, NameHotel: e.target.value })}
          />
        ) : (
          rowData.NameHotel
        )}
      </td>
      <td>
        {isEditing ? (
          <input className={styles.in}
            type="text"
            value={editedRow.entryDate || ""}
            onChange={(e) => setEditedRow({ ...editedRow, entryDate: e.target.value })}
          />
        ) : (
          rowData.entryDate
        )}
      </td>
      <td>
        {isEditing ? (
          <input className={styles.in}
            type="text"
            value={editedRow.DepartureDate || ""}
            onChange={(e) => setEditedRow({ ...editedRow, DepartureDate: e.target.value })}
          />
        ) : (
          rowData.DepartureDate
        )}
      </td>
      <td>
        {isEditing ? (
          <input className={styles.in}
            type="text"
            value={editedRow.address || ""}
            onChange={(e) => setEditedRow({ ...editedRow, address: e.target.value })}
          />
        ) : (
          rowData.address
        )}
      </td>
      <td>
        {isEditing ? (
          <div className={styles.btn}>
            <button onClick={handleEdit}>
               Save
            </button>
            <button
            className={styles.trash} onClick={() => setIsEditing(false)}>
              <FaTrash/> Delete</button>
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
    </tr>
  );
};

export default EditableRow;
