import styles from './PaymentMethod.module.css'
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditableRow from './EditablePayment/EditableRow';
 // Asegúrate de ajustar la ruta según tu estructura

const PaymentMethod = () => {
  const initialData = [
    { id: 1, firstName: 'Mark', lastName: 'finish in 9416', email: '04/26', phone: 'Visa' },
    { id: 2, firstName: 'Micaela', lastName: 'finish in 9537', email: '11/27', phone: 'Mastercard' },
    { id: 3, firstName: 'Peter', lastName: 'finish in 21001', email: '09/25', phone: 'American Express' },
    
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
            <th>Owner's Name</th>
            <th>Card Number</th>
            
            <th>Expiration</th>
          
            <th>Card Type</th>
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

export default PaymentMethod;
