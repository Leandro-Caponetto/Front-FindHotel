import styles from './FilterOrder.module.css'
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
// import { useState, useEffect } from "react";
import { setDestination, selectAll, setFilteredHotels, sortAscendant, sortDescendent, sortLowCategory, sortPriceHigh, sortPriceLow, sortTopCategory } from "../../redux/destinations";
import { useEffect } from 'react';


const FilterOrder = ({initFilter, data, onChangeFilter}) =>{

    // const filteredHotels = useSelector(state => state.destination.filteredHotels)
    const dispatch = useDispatch();
    const order = useSelector(state => state.destination.order);

    useEffect(() =>{
        dispatch(selectAll(data))
        dispatch(setFilteredHotels('all'))
        onChangeFilter('all')
        
    },[data])

    console.log('nose que poner', data);

    const orderFilter = (value) =>{
        switch(value){
            case 'Ascendant': dispatch(sortAscendant(data)); break;
            case "Descendent": dispatch(sortDescendent(data)); break;
            case "TopCategory": dispatch(sortTopCategory(data)); break;
            case "LowCategory": dispatch(sortLowCategory(data)); break;
            case "PriceLow": dispatch(sortPriceLow(data)); break;
            case "PriceHigh": dispatch(sortPriceHigh(data)); break;
            case "all": dispatch(selectAll(data)); break;
            default: return data;
        }
    } 

    const handleOrder = (event) => {
        const value = event.target.value;
        dispatch(setFilteredHotels(value));
        orderFilter(value)
        onChangeFilter(value)
    };

    return(
        <div>
        <select
          className={styles.buttons}
          value={order}
          onChange={handleOrder}
          name="order"
        >
          <option value="all" >
            SELECT ORDER
          </option>
          <option value="Ascendant">Ascendant</option>
          <option value="Descendent">Descendent</option>
          <option value="TopCategory">Top Category</option>
          <option value="LowCategory">Low Category</option>
          <option value="PriceLow">Price (lower first)</option>
          <option value="PriceHigh">Price (hight first)</option>
        </select>
        </div>
    )
}

FilterOrder.propTypes = {
    initFilter: PropTypes.array,
    onChangeFilter: PropTypes.func,
    data: PropTypes.array
  
  };

export default FilterOrder;