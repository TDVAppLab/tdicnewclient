import { makeAutoObservable, runInAction } from 'mobx'
import type { Quaternion, Vector3 } from 'three'

import agent from '../api/agent'

export default class SceneInfoStore {
  camera_pos: Vector3 | undefined = undefined
  orbit_target: Vector3 | undefined = undefined
  quaternion: Quaternion | undefined = undefined

  target_camera_pos: Vector3 | undefined = undefined
  mode_transport: boolean = false

  screen_shot_trigger: boolean = true
  screen_shot: string = ''

  is_automatic_camera_rotate: boolean = true

  selectedInstructionId = 0

  constructor() {
    makeAutoObservable(this)
  }

  setCamarePos = (pos: Vector3) => {
    this.camera_pos = pos
  }

  setCamareQuaternion = (quaternion: Quaternion) => {
    this.quaternion = quaternion
  }

  setOrbitTarget = (pos: Vector3) => {
    this.orbit_target = pos
  }

  setSelectedInstructionId = (id: number) => {
    this.selectedInstructionId = id
  }

  setModeTransport = (state: boolean) => {
    runInAction(() => {
      this.mode_transport = state
    })
  }

  setScreenShot = (screen_shot: string) => {
    runInAction(() => {
      this.screen_shot = screen_shot
    })
  }

  setScreenShotTrigger = () => {
    runInAction(() => {
      this.screen_shot_trigger = !this.screen_shot_trigger
    })
  }

  createEyeCatch = async (id_article: string) => {
    try {
      await agent.Attachmentfiles.createeyecatch({
        id_article: id_article,
        imgfilebin: this.screen_shot,
      })
    } catch (error) {
      console.log(error)
    }
  }

  setIsAutomaticCameraRotate = (state: boolean) => {
    runInAction(() => {
      this.is_automatic_camera_rotate = state
    })
  }
}
