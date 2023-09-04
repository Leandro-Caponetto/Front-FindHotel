import React,  { useState } from 'react';
import CreateHotel from '../CreateHotel/CreateHotel';
import BarChart from './Barchart';
import styles from "./RenderDashboard.module.css"
import Table from 'react-bootstrap/Table';
import EditableRow from './Editable/EditableRow'; 
import DataReserve from './DataReserve/DataReserve'
import PaymentMethod from './PaymentMethod/PaymentMethod'
import Guest from './Guest/Guest';
const RenderView = ( {selectedView} ) => {
 
  const initialData = [
    { id: 1, firstName: 'Micaela', lastName: 'Otto', username: '@mdo', email: 'mdo@example.com', phone: '123-456-7890' },
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


  switch (selectedView) {
    case 'statistics':
      return (
        <div >
      <h1 className={styles.title}>Welcome</h1>
<h1 className={styles.h1}>customer registration data</h1>
   <h2>Data</h2>
   <div className={styles.card}>
   <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            
            <th>Email</th>
            <th>Phone</th>
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
   
    </div>
      );
    case 'sales':
      return (
        <div>
          <h1 className={styles.title}>Reservation Control</h1>
      <h1 className={styles.h1}>booking record</h1>
          <DataReserve/>
        </div>
      );
    case 'hotel':
      return (
        <div className={styles.todo}>
          <h1 className={styles.title}>Payment Data</h1>
<h1 className={styles.h1}>Add the payment method to speed up the booking process</h1>
         <PaymentMethod/>
        </div>
      );
    case 'rooms':
      return (
        <div className={styles.todo}>
           <h1 className={styles.title}>Guest Data</h1>
<h1 className={styles.h1}>Add or edit information about guests</h1>
        <Guest/>
        </div>
      );
    default:
      return null;
  }
};

export default RenderView;
