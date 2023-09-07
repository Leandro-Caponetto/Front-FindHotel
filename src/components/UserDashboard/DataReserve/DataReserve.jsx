import styles from './DataReserve.module.css';
import { style } from 'd3';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import EditableRow from './EditableReserve/EditableRow';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axiosInstance from '../../../utils/axiosInstance';
// Asegúrate de ajustar la ruta según tu estructura
const DataReserve = () => {
  const [data, setData] = useState([]);
  // const initialData = [
  //   { id: 1, NameHotel:'Alvear Hotel', entryDate: '02/08/23', DepartureDate: '20/08/23', address: 'Avellaneda 1644' },
  //   { id: 2, NameHotel: 'Faena Hotel', entryDate: '10/02/23', DepartureDate: '20/03/23', address: 'Martha Salotti 445' },
  //   { id: 3, NameHotel: 'Palacio Duhau - Park Hyatt ', entryDate: '05/10/22', DepartureDate: '10/11/22', address: 'Av. Alvear 1661' },
  //   // ... otras filas ...
  // ];
  const fetchHotel = async () => {
    try {
      const response = await axiosInstance.get('/deals/user/64effefa6a31af53b08ef778');
      const data = response.data.dealsUser

      const dealsInfo = data.deals.map((deal) => {

        return ({
          NameHotel: deal.hotel.name,
          entryDate: deal.checkIn,
          DepartureDate: deal.checkOut,
          address: deal.hotel.address,

        })
      })


      setData(dealsInfo);
      return dealsInfo

    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };
  useEffect(() => {
    !data.length && fetchHotel()
  }, [])
  console.log("##data->", data)


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
