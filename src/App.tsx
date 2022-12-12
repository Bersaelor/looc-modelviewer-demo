import React, { useState, useEffect } from 'react';
import './App.css';

import { CircularProgress } from '@mui/material';
import { Container } from '@mui/material';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import ModelSelector from 'components/ModelSelector/ModelSelector';

import { fetchAppData } from 'API';

import AppData from 'models/AppData';
import { NameSelector } from 'components/NameSelector/NameSelector';

const brands = ["grafix", "frameshaper", "loocfun", "reframd", "sachsenweger"];


function App() {
  const [isLoading, setIsLoading] = useState(Boolean);
  const [brandIndex, setBrandIndex] = useState(0);
  const [isTesting, setIsTesting] = useState(true);
  const [networkError, setNetworkError] = useState<Error | undefined>(undefined);
  const [appData, setAppData] = useState<AppData | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const appData = await fetchAppData(brands[brandIndex], isTesting)
        setAppData(appData)
      } catch (error) {
        setNetworkError(error as Error)
      }
      setIsLoading(false)
    };
    loadData()
  }, [brandIndex, isTesting]);


  return (
    <div className="App">
      <Container>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <Typography variant="h4">
                LooC Modelviewer demo
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <NameSelector title={'Brand'} names={brands} index={brandIndex} selectIndex={setBrandIndex} />
          </Grid>
        </Grid>


        {isLoading &&
          <CircularProgress sx={{ width: 8, height: 8 }} />
        }
        {networkError &&
          <Typography color="error">
            {networkError.message}
          </Typography>
        }
        {appData &&
          <ModelSelector brand={brands[brandIndex]} appData={appData} />
        }
      </Container>
    </div>
  );
}

export default App;
