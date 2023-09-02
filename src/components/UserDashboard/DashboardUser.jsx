import styles from './DashboardUser.module.css';
import { FaRegCalendar,FaRegAddressCard,  FaCreditCard,FaUserAlt, FaUsersCog, FaPen, FaPlus } from 'react-icons/fa';
import { MdNavigateNext, MdAttachMoney } from 'react-icons/md';
import { useState } from 'react';
import RenderView from './RenderDashboard';
import logo from '../../assets/image/logoBlack-removebg-preview.png'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [selectedView, setSelectedView] = useState('statistics');

  const handleViewChange = (view) => {
    setSelectedView(view);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className={styles.dashboard}>
      <nav className={styles.navbar}>
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
                
        <aside className={styles.sidebar}>
          <ul className={styles.menu}>
            <li onClick={() => handleViewChange('statistics')}>
              <span className={styles.span}>
                <FaRegAddressCard className={styles.icon} />
                Data
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('sales')}>
              <span className={styles.span}>
                <FaRegCalendar className={styles.icon} />
                Reserve
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('hotel')}>
              <span className={styles.span}>
                <FaCreditCard className={styles.icon} />
                Payment Method
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('rooms')}>
              <span className={styles.span}>
                <FaUsersCog className={styles.icon} />
                Guest
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

export default Dashboard;