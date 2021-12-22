import React, { useState, useEffect } from 'react';
import './App.css';

import { CircularProgress } from '@mui/material';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';

import ModelSelector from 'components/ModelSelector/ModelSelector';

import { fetchAppData } from 'API';

import AppData from 'models/AppData';

function App() {
  const [isLoading, setIsLoading] = useState(Boolean);
  const [networkError, setNetworkError] = useState<Error | undefined>(undefined);
  const [appData, setAppData] = useState<AppData | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const appData = await fetchAppData()
        setAppData(appData)
      } catch (error) {
        setNetworkError(error as Error)
      }
      setIsLoading(false)
    };
    loadData()
  }, []); 


  return (
    <div className="App">
      <Typography variant="h4">
        LooC Modelviewer demo
      </Typography>

      <Container>
        {isLoading &&
          <CircularProgress sx={{ width: 8, height: 8 }}/>
        }
        {networkError &&
          <Typography color="error">
            {networkError.message}
          </Typography>
        }
        {appData &&
          <ModelSelector appData={appData} />
        }
      </Container>
    </div>
  );
}

export default App;
