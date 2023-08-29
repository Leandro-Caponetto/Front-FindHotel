import React from 'react';
import CreateHotel from '../CreateHotel/CreateHotel';
import BarChart from './Barchart';
import styles from "./RenderDashboard.module.css"

const RenderView = ( {selectedView} ) => {
  const reservationsData = [
    { label: 'May', value: 0.5 },
    { label: 'June', value: 20 },
    { label: 'July', value: 15 },
    { label: 'Agost', value: 60 },
  ];
  const visitsData = [
    { label: 'May', value: 200 },
    { label: 'June', value: 150 },
    { label: 'July', value: 300 },
    { label: 'Agost', value: 500 },
  ];

  switch (selectedView) {
    case 'statistics':
      return (
        <div>
      <h1 className={styles.title}>Welcome</h1>
<h1 className={styles.h1}>These are your latest stats</h1>
      <BarChart data={reservationsData} title="Reservations Last Month" />
      <BarChart data={visitsData} title="Visits to Detail Pages" />
      <BarChart  data={visitsData} title="Sales" />
    </div>
      );
    case 'sales':
      return (
        <div>
          <h1>THIS IS SALES</h1>
        </div>
      );
    case 'hotel':
      return (
        <div>
         <CreateHotel/>
        </div>
      );
    case 'rooms':
      return (
        <div>
        <h1>THIS IS ROOMS</h1>
        </div>
      );
    default:
      return null;
  }
};

export default RenderView;
