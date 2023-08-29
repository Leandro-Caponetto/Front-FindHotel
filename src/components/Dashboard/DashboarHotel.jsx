import styles from './DashboardHotel.module.css';
import { FaChartLine,  FaBuilding, FaBed } from 'react-icons/fa';
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

  return (
    <div className={styles.dashboard}>
      <nav className={styles.navbar}>
        <div className={styles.logoNavbar}><FaBuilding/></div>
        <Link to = "/">
        <div className={styles.title}><img className={styles.logo} src={logo} alt="Logo" /></div></Link>
      </nav>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul className={styles.menu}>
            <li onClick={() => handleViewChange('statistics')}>
              <span className={styles.span}>
                <FaChartLine className={styles.icon} />
                Statistics
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('sales')}>
              <span className={styles.span}>
                <MdAttachMoney className={styles.icon} />
                Sales
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('hotel')}>
              <span className={styles.span}>
                <FaBuilding className={styles.icon} />
                Hotel
                <MdNavigateNext className={styles.iconNext} />
              </span>
            </li>
            <li onClick={() => handleViewChange('rooms')}>
              <span className={styles.span}>
                <FaBed className={styles.icon} />
                Rooms
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