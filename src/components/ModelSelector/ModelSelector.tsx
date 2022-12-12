import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';

import ColorThumbnail from 'components/ColorThumbnail/ColorThumbnail';
import Thumbnail from 'components/Thumbnail/Thumbnail';
import ModelViewer from 'components/ModelViewer/ModelViewer';

import AppData from 'models/AppData';
import Category from 'models/Category';
import Model from 'models/Model';
import Material from 'models/Material';
import Rendering from 'models/Rendering';

import { fetchRendering } from 'API';

export const ModelSelector = ({ brand, appData }: { brand: string, appData: AppData }) => {

  const metals = appData.materials.filter(m => m.type === 'metal')
  const plastics = appData.materials.filter(m => m.type === 'plastic')

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [modelsInCategory, setModelsInCategory] = useState<Model[] | undefined>(undefined);
  const [model, setModel] = useState<Model | undefined>(undefined);
  const [metal, setMetal] = useState<Material | undefined>(undefined);
  const [plastic, setPlastic] = useState<Material | undefined>(undefined);
  const [rendering, setRendering] = useState<Rendering | undefined>(undefined);
  const [exposure, setExposure] = useState<number>(1);
  const [shadowIntensity, setShadowIntensity] = useState<number>(0);
  const [shadowSoftness, setShadowSoftness] = useState<number>(0.5);

  useEffect(() => {
    setCategory(undefined)
    setModel(undefined)
    setMetal(undefined)
    setPlastic(undefined)
  }, [brand]);

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
    if (plastics.length > 0 && !plastic) setPlastic(plastics[0])
  }, [plastics, plastic]);

  useEffect(() => {
    if (modelsInCategory && modelsInCategory.length > 0) setModel(modelsInCategory[0])
  }, [modelsInCategory]);

  useEffect(() => {
    const load = async(categoryID: string, modelID: string, metalID: string, plasticId: string) => {
      setRendering(undefined)
      setRendering(await fetchRendering(brand, categoryID, modelID, plasticId, metalID))
    }
    if (category && model && metal && plastic) load(category.name, model.name, metal.identifier, plastic.identifier)
  }, [brand, category, model, metal, plastic]);

  return <>
    <ImageList cols={appData.categories.length} gap={0} rowHeight={78} sx={{height: 90, marginBlockEnd: '4px'}}>
      {appData.categories.map(c => <ImageListItem key={c.name}>
        <Button onClick={() => setCategory(c)}>
          <Thumbnail
            imgSrc={c.image}
            title={c.localizedTitles['en'] || '?'}
            chosen={(category && category.name === c.name) || false}
          />
        </Button>
      </ImageListItem>)}
    </ImageList>
    {modelsInCategory &&
      <ImageList cols={modelsInCategory.length} gap={0} rowHeight={80} sx={{height: 90, marginBlockStart: '0', marginBlockEnd: '4px'}}>
        {modelsInCategory?.map(m => <ImageListItem key={m.name}>
          <Button onClick={() => setModel(m)}>
            <Thumbnail
              imgSrc={m.image}
              title={m.localizedNames['en'] || '?'}
              chosen={(model && model.name === m.name) || false}
            />
          </Button>
        </ImageListItem>)}
      </ImageList>
    }
    <ImageList cols={metals.length} gap={0} rowHeight={56} sx={{height: 80, marginBlockStart: '0', marginBlockEnd: '4px'}}>
      {metals?.map(m => <ImageListItem key={m.identifier}>
        <Button onClick={() => setMetal(m)}>
          <ColorThumbnail
            material={m}
            chosen={(metal && metal.identifier === m.identifier) || false}
          />
        </Button>
      </ImageListItem>)}
    </ImageList>
    <ImageList cols={plastics.length} gap={0} rowHeight={56} sx={{height: 80, marginBlockStart: '0', marginBlockEnd: '4px'}}>
      {plastics?.map(m => <ImageListItem key={m.identifier}>
        <Button onClick={() => setPlastic(m)}>
          <ColorThumbnail
            material={m}
            chosen={(plastic && plastic.identifier === m.identifier) || false}
          />
        </Button>
      </ImageListItem>)}
    </ImageList>

    {rendering && model ?
      <ModelViewer
        modelName={model.localizedNames['en'] || 'unknown'} 
        rendering={rendering} 
        exposure={exposure}
        setExposure={setExposure}
        shadowIntensity={shadowIntensity}
        setShadowIntensity={setShadowIntensity}
        shadowSoftness={shadowSoftness}
        setShadowSoftness={setShadowSoftness}
      />
    :
      <CircularProgress />
    }
  </>
}

export default ModelSelector
