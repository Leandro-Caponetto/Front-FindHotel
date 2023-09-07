import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './EditableRow.module.css';

const EditableRow = ({ index, rowData, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(rowData);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(index, editedRow);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <tr>
      <td>{rowData.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedRow.firstName}
            onChange={(e) => setEditedRow({ ...editedRow, firstName: e.target.value })}
          />
        ) : (
          rowData.firstName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedRow.lastName}
            onChange={(e) => setEditedRow({ ...editedRow, lastName: e.target.value })}
          />
        ) : (
          rowData.lastName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedRow.country}
            onChange={(e) => setEditedRow({ ...editedRow, country: e.target.value })}
          />
        ) : (
          rowData.country
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editedRow.age}
            onChange={(e) => setEditedRow({ ...editedRow, age: e.target.value })}
          />
        ) : (
          rowData.age
        )}
      </td>
      
      <td>{isEditing ? (
          <input
            type="text"
            value={editedRow.email}
            onChange={(e) => setEditedRow({ ...editedRow, email: e.target.value })}
          />
        ) : (
          rowData.email
        )}</td>
      <td>{isEditing ? (
          <input
            type="tel"
            value={editedRow.phome}
            onChange={(e) => setEditedRow({ ...editedRow, phone: e.target.value })}
          />
        ) : (
          rowData.phone
        )}</td>
      <td>
        {isEditing ? (
          <div className={styles.btn}>
            <button onClick={handleEdit}>
              <FaEdit /> Save
            </button>
            <button className={styles.trash} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          < div className={styles.btn}>
            <button onClick={handleEdit}>
              <FaEdit /> Edit
            </button>
            <button className={styles.trash} onClick={handleDelete}>
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default EditableRow;
