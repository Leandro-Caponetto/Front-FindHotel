import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

// eslint-disable-next-line react/prop-types
export default function Overview({actions}) {
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    border: '1px solid #c7c7c7',
    borderRadius:'10px',
  };
  
  const handleOnClick = (m)=>{
    switch (m) {
      case 'Search Hotel':
        // eslint-disable-next-line react/prop-types
        return actions.handleQuestion('¿How do I look for a hotel?')
        //break;
      case 'Reserve room':
         // eslint-disable-next-line react/prop-types
        return actions.handleQuestion('¿How can I reserve a room?')
        //break;
      case 'I have a hotel':
         // eslint-disable-next-line react/prop-types
        return actions.handleQuestion('¿How can I offer my hotel on the page?')
        //break;
      case 'Dashboard':
         // eslint-disable-next-line react/prop-types
        return actions.handleQuestion('¿What can I do in my dashboard?')
        //break;
        case 'Other information':
           // eslint-disable-next-line react/prop-types
          return actions.handleQuestion('I need other information')
        //break;
      default:
         // eslint-disable-next-line react/prop-types
        return actions.handleGoodBye()
    }
  }

  return (
      <List sx={style}  component="nav">
      <ListItemButton sx={{ fontSize: 12, fontFamily:"cocogoose"}} onClick={() => handleOnClick('Search Hotel')}>
        <p className='text-sm font-semibold'>¿How do I look for a hotel?</p>
      </ListItemButton>
      <Divider />
      <ListItemButton sx={{ fontSize: 12, fontFamily:"cocogoose" }} onClick={() => handleOnClick('Reserve room')}>
        <p className='text-sm font-semibold'>¿How can I reserve a room?</p>
      </ListItemButton>
      <Divider />
      <ListItemButton sx={{ fontSize: 12, fontFamily:"cocogoose" }} onClick={() => handleOnClick('I have a hotel')}>
        <p className='text-sm font-semibold'>¿How can I offer my hotel on the page?</p>
      </ListItemButton>
      <Divider />
      <ListItemButton sx={{ fontSize: 12, fontFamily:"cocogoose" }} onClick={() => handleOnClick('Dashboard')}>
        <p className='text-sm font-semibold'>¿What can I do in my dashboard?</p>
      </ListItemButton>
      <Divider />
      <ListItemButton sx={{ fontSize: 12, fontFamily:"cocogoose" }} onClick={() => handleOnClick('Other information')}>
        <p className='text-sm font-semibold'>I need other information</p>
      </ListItemButton>
      <Divider />
      <ListItemButton sx={{ fontSize: 12, fontFamily:"cocogoose" }} onClick={() => handleOnClick('Thanks, that is all for now')}>
        <p className='text-sm font-semibold'>Thanks, that is all for now</p>
      </ListItemButton>
    </List>

  );
}
