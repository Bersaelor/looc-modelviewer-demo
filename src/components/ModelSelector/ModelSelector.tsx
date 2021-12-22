import React, { useState, useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemButton } from '@mui/material';
import { Typography } from '@mui/material';

import ColorThumbnail from 'components/ColorThumbnail/ColorThumbnail';
import Thumbnail from 'components/Thumbnail/Thumbnail';
import ModelViewer from 'components/ModelViewer/ModelViewer';

import AppData from 'models/AppData';
import Category from 'models/Category';
import Model from 'models/Model';
import Material from 'models/Material';
import Rendering from 'models/Rendering';

import { fetchRendering } from 'API';

const HorizontalList = styled(List)(({
  display: 'flex',
  flexDirection: 'row',
  padding: 0
}))

export const ModelSelector = ({ appData }: { appData: AppData }) => {

  const metals = appData.materials.filter(m => m.type === 'metal')

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [modelsInCategory, setModelsInCategory] = useState<Model[] | undefined>(undefined);
  const [model, setModel] = useState<Model | undefined>(undefined);
  const [metal, setMetal] = useState<Material | undefined>(undefined);
  const [rendering, setRendering] = useState<Rendering | undefined>(undefined);

  useEffect(() => {
    if (appData && !category && appData?.categories.length > 0) setCategory( appData?.categories[0])

    if (appData && category) {
      setModelsInCategory(appData.models.filter(m => m.category === category.name))
    }

  }, [appData, category]);

  useEffect(() => {
    if (metals.length > 0 && !metal) setMetal(metals[0])
  }, [metals, metal]);

  useEffect(() => {
    if (modelsInCategory && modelsInCategory.length > 0) setModel(modelsInCategory[0])
  }, [modelsInCategory]);

  useEffect(() => {
    const load = async(categoryID: string, modelID: string, metalID: string) => {
      setRendering(undefined)
      setRendering(await fetchRendering(categoryID, modelID, undefined, metalID))
    }
    if (category && model && metal) load(category.name, model.name, metal.identifier)
  }, [category, model, metal]);

  return <>
    <HorizontalList>
      {appData.categories.map(c => <ListItem key={c.name}>
        <ListItemButton onClick={() => setCategory(c)}>
          <Thumbnail
            imgSrc={c.image}
            title={c.localizedTitles['en'] || '?'}
            chosen={(category && category.name === c.name) || false}
          />
        </ListItemButton>
      </ListItem>)}
    </HorizontalList>
    <HorizontalList>
      {modelsInCategory?.map(m => <ListItem key={m.name}>
        <ListItemButton onClick={() => setModel(m)}>
          <Thumbnail
            imgSrc={m.image}
            title={m.localizedNames['en'] || '?'}
            chosen={(model && model.name === m.name) || false}
          />
        </ListItemButton>
      </ListItem>)}
    </HorizontalList>
    <HorizontalList>
      {metals?.map(m => <ListItem key={m.identifier}>
        <ListItemButton onClick={() => setMetal(m)}>
          <ColorThumbnail
            material={m}
            chosen={(metal && metal.identifier === m.identifier) || false}
          />
        </ListItemButton>
      </ListItem>)}
    </HorizontalList>
    {rendering && model ?
      <ModelViewer modelName={model.localizedNames['en'] || 'unknown'} rendering={rendering} />
    :
      <CircularProgress />
    }
  </>
}

export default ModelSelector
