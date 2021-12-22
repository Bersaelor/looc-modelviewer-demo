import React from 'react';
import "@google/model-viewer";

import './ModelViewer.css'

import Rendering from 'models/Rendering';
import Typography from '@mui/material/Typography';

function ModelViewer({
    modelName,
    rendering
}: {
    modelName: string,
    rendering: Rendering
}) {
    return <div className="container modelviewer">
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
                    environment-image="neutral" >
                    {/* put a url above in order to get a different reflection
                 // @ts-ignore */}
                </model-viewer>
            </div>
            :
            <Typography color="error">
                No gltf rendering found for {modelName}
            </Typography>
        }
    </div>

}

export default ModelViewer
