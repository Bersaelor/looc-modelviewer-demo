import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

import Material from 'models/Material';


const StyledBox = styled(Box)(({ theme }) => ({
  width: '7em',
  textAlign: 'center',
  borderRadius: '8px',
  borderColor: theme.palette.primary.main
}))

export const ColorThumbnail = ({
  material,
  chosen
}: {
  material: Material,
  chosen: boolean
}) => {
  
  let hexColor = (material.parameters.hexValue as unknown as string) || '#ffffff'

  return <StyledBox sx={{
    borderStyle: chosen ? 'solid' : 'none'
  }}>
    <Box sx={{ width: '100%', height: '24px', backgroundColor: hexColor }} />

    <Typography variant="caption">
      {material.localizedNames['en']}
    </Typography>
  </StyledBox>
}

export default ColorThumbnail