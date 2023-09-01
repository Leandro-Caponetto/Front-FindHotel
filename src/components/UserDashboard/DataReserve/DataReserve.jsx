import styles from './DataReserve.module.css';
import { style } from 'd3';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import EditableRow from './EditableReserve/EditableRow'; 
import { FaEdit, FaTrash } from 'react-icons/fa';
 // Asegúrate de ajustar la ruta según tu estructura
const DataReserve = () => {
  const initialData = [
    { id: 1, firstName: 'Alvear Hotel', lastName: '02/08/23', email: '20/08/23', phone: 'Avellaneda 1644' },
    { id: 2, firstName: 'Alvear Hotel', lastName: '02/08/23', email: '20/08/23', phone: 'Avellaneda 1644' },
    { id: 3, firstName: 'Alvear Hotel', lastName: '02/08/23', email: '20/08/23', phone: 'Avellaneda 1644' },
    // ... otras filas ...
  ];

  const [data, setData] = useState(initialData);

  const handleEdit = (index, updatedRow) => {
    const updatedData = [...data];
    updatedData[index] = updatedRow;
    setData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };



  return (
    <>
    <div className={styles.card}>
   <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name of the Hotel</th>
            <th>Entry Date</th>
            
            <th>Departure Date</th>
            <th>Hotel Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <EditableRow
              key={row.id}
              index={index}
              rowData={row}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>
   </div>
    </>
  );
};

export default DataReserve;
