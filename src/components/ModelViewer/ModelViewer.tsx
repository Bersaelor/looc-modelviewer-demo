import React from 'react';
import "@google/model-viewer";

import './ModelViewer.css'

import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import CameraRoundedIcon from '@mui/icons-material/CameraRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import { Grid } from '@mui/material';
import Rendering from 'models/Rendering';
import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';

const LabelBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
}))

function ModelViewer({
  modelName,
  rendering,
  exposure,
  setExposure,
  shadowIntensity,
  setShadowIntensity,  
  shadowSoftness,
  setShadowSoftness
}: {
  modelName: string,
  rendering: Rendering
  exposure: number,
  setExposure: (v: number) => void
  shadowIntensity: number,
  setShadowIntensity: (v: number) => void,  
  shadowSoftness: number,
  setShadowSoftness: (v: number) => void
}) {

  return <Box>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <LabelBox>
          <CameraRoundedIcon />
          <Typography id="input-slider" gutterBottom>
            Exposure
          </Typography>
        </LabelBox>
        <Slider
          aria-label="Small"
          min={0}
          max={2}
          size="small"
          step={0.01}
          value={exposure}
          valueLabelDisplay="auto"
          onChange={(event, value) => setExposure(value as number)}
        />
      </Grid>
      <Grid item xs={4}>
        <LabelBox>
          <NightlightRoundIcon />
          <Typography id="input-slider" gutterBottom>
            Shadow Intensity
          </Typography>
        </LabelBox>
        <Slider
          aria-label="Small"
          min={0}
          max={1}
          size="small"
          step={0.01}
          value={shadowIntensity}
          valueLabelDisplay="auto"
          onChange={(event, value) => setShadowIntensity(value as number)}
        />
      </Grid>
      <Grid item xs={4}>
        <LabelBox>
          <LightModeIcon />
          <Typography id="input-slider" gutterBottom>
            Shadow Softness
          </Typography>
        </LabelBox>
        <Slider
          aria-label="Small"
          min={0}
          max={1}
          size="small"
          step={0.01}
          value={shadowSoftness}
          valueLabelDisplay="auto"
          onChange={(event, value) => setShadowSoftness(value as number)}
        />
      </Grid>
    </Grid>
    <div className="container modelviewer">
      {rendering && rendering.gltf ?
        <div className="threed-container">
          {/*
                 // @ts-ignore */}
          <model-viewer
            loading="eager"
            src={rendering.gltf}
            alt="3D view of glasses model"
            ar ar-modes="webxr scene-viewer"
            auto-rotate camera-controls
            environment-image="neutral"
            exposure={exposure}
            shadow-intensity={shadowIntensity}
            shadow-softness={shadowSoftness}
          >
            {/*
                 // @ts-ignore */}
          </model-viewer>
        </div>
        :
        <Typography color="error">
          No gltf rendering found for {modelName}
        </Typography>
      }
    </div>
  </Box>

}

export default ModelViewer
