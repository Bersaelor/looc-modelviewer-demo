import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: '10em',
  maxHeight: '80px',
  textAlign: 'center',
  borderRadius: '8px',
  borderColor: theme.palette.primary.main
}))

export const Thumbnail = ({
  imgSrc,
  title,
  chosen
}: { 
  imgSrc: string, 
  title: string,
  chosen: boolean
}) => {

  return <StyledBox sx={{ 
    borderStyle: chosen ? 'solid' : 'none'
  }}>
    <Box sx={{maxHeight: '40px'}}>
      <img src={imgSrc} alt={title} width='60px'/>
    </Box>

    <Typography variant="caption">
      {title}
    </Typography>
  </StyledBox>
}

export default Thumbnail