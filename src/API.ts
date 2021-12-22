import AppData from "models/AppData"
import Rendering from 'models/Rendering'

export async function fetchAppData() {
  const response = await apiGet('https://apic.looc.io/grafix/app-data')
  return await response as unknown as AppData
}

export async function fetchRendering(categoryID: string, modelID: string, plasticID: string = '000templeplastic', metalID: string) {
  // e.g. 'https://apic.looc.io/grafix/rendering/bloxx/Bloxx3?plastic=000templeplastic&metal=01titanium'
  const response = await apiGet(`https://apic.looc.io/grafix/rendering/${categoryID}/${modelID}`, {
    plastic: plasticID,
    metal: metalID
  })
  return await response as unknown as Rendering
}

async function apiGet(urlString: string, params: { [key: string]: any } = {}) {
  const url = new URL(urlString)
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  console.log("Fetching ", url.toString(), " from API")

  const response = await fetch(url.href, {
    method: 'GET'
  })

  if (response.ok) {
    const json = await response.json()
    return json
  } else {
    throw new Error(`Failed to load ${urlString} with status code ${response.status}`)
  }
}