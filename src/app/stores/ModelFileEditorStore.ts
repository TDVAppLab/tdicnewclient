import { makeAutoObservable, runInAction } from 'mobx'

export interface SceneObject {
  uuid: string
  type: string
  name: string
  visible: boolean
}

export default class ModelFileEditorStore {
  // Basic Canvas Settings
  liner = false

  // Basic settings for screen elements
  bgcolor = '#ffffff'

  // Animation

  sceneObjects = new Map<string, SceneObject>()

  constructor() {
    makeAutoObservable(this)
  }

  resetSettings = () => {
    runInAction(() => {
      this.liner = false
      this.bgcolor = '#ffffff'
      this.sceneObjects.clear()
    })
  }

  setLiner = (liner: boolean) => {
    runInAction(() => {
      this.liner = liner
    })
  }

  setBgcolor = (bgcolor: string) => {
    runInAction(() => {
      this.bgcolor = bgcolor
    })
  }

  setSceneObjects = (id: string, value: SceneObject) => {
    runInAction(() => {
      this.sceneObjects.set(id, value)
    })
  }
}
