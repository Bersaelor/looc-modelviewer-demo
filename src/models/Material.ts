
type MaterialType = 'glas' | 'plastic' | 'metal' | 'extra'
type MaterialState = 'unpublished' | 'testing' | 'published'

export type { MaterialType, MaterialState }

type Material = {
    identifier: string
    type: MaterialType
    status: MaterialState
    lastEdited?: string
    lastEditedBy?: string
    localizedNames: {[key: string]: string}
    parameters: {[key: string]: any}
    image?: string 
    normalTex?: string 
}

export default Material