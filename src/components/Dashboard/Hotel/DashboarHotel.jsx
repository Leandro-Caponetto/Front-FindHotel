<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
import styles from './DashboardUser.module.css';
import { FaRegCalendar,FaRegAddressCard,  FaCreditCard,FaUserAlt, FaUsersCog, FaPen, FaPlus } from 'react-icons/fa';


import { MdNavigateNext, MdAttachMoney } from 'react-icons/md';
import { useState } from 'react';
import RenderView from './RenderDashboard';
import logo from '../../assets/image/logoBlack-removebg-preview.png'
import { Link } from 'react-router-dom';
const Dashboard = () => {
========
import styles from './DashboardHotel.module.css';
import { FaChartLine,  FaBuilding, FaBed } from 'react-icons/fa';
import { MdNavigateNext, MdAttachMoney } from 'react-icons/md';
import { useState } from 'react';
import RenderView from './Render/RenderDashboard';
import logo from '../../../assets/image/logoBlack-removebg-preview.png'
import { Link } from 'react-router-dom';

const DashboardHotel = () => {
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
  const [selectedView, setSelectedView] = useState('statistics');

  const handleViewChange = (view) => {
    setSelectedView(view);
  };
<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
========
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx

  return (
    <div className={styles.dashboard}>
      <nav className={styles.navbar}>
<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
        <div className={styles.logoNavbar}>{selectedFile ? (
        <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
      ) : (
        <FaUserAlt className="icon" />
      )}
      <label className={styles.uploadButton}>
        {selectedFile ? <FaPen/> : <FaPlus/>}
        <input type="file" name="foto" onChange={handleFileChange} />
      </label></div>
        <Link to = "/">
        
        <div className={styles.lo}><img className={styles.logo} src={logo} alt="Logo" /></div></Link>
      </nav>
      <div className={styles.container}>
                
========
        <div className={styles.logoNavbar}><FaBuilding/></div>
        <Link to = "/">
        <div className={styles.title}><img className={styles.logo} src={logo} alt="Logo" /></div></Link>
      </nav>
      <div className={styles.container}>
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
        <aside className={styles.sidebar}>
          <ul className={styles.menu}>
            <li onClick={() => handleViewChange('statistics')}>
              <span className={styles.span}>
<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
                <FaRegAddressCard className={styles.icon} />
                Data
========
                <FaChartLine className={styles.icon} />
                Statistics
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('sales')}>
              <span className={styles.span}>
<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
                <FaRegCalendar className={styles.icon} />
                Reserve
========
                <MdAttachMoney className={styles.icon} />
                Sales
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('hotel')}>
              <span className={styles.span}>
<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
                <FaCreditCard className={styles.icon} />
                Payment Method
========
                <FaBuilding className={styles.icon} />
                Hotel
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('rooms')}>
              <span className={styles.span}>
<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
                <FaUsersCog className={styles.icon} />
                Guest
========
                <FaBed className={styles.icon} />
                Rooms
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
          </ul>
        </aside>
        <main className={styles.content}>
          <RenderView selectedView={selectedView} />
        </main>
      </div>
    </div>
  );
};

<<<<<<<< HEAD:src/components/UserDashboard/DashboardUser.jsx
export default Dashboard;
========
export default DashboardHotel;
>>>>>>>> df92cc5ffc845bc78a742928698418a9836ad654:src/components/Dashboard/Hotel/DashboarHotel.jsx
