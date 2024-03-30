export type OrbitalPass = {
    id: string
    noradcatid: number
    aos: Date
    los: Date
    maxel: Date
    aos_target_longitude: number
    aos_target_latitude: number
    aos_target_height: number
    aos_target_azimuth: number
    aos_target_elevation: number
    aos_target_rangeSat: number
    los_target_longitude: number
    los_target_latitude: number
    los_target_height: number
    los_target_azimuth: number
    los_target_elevation: number
    los_target_rangeSat: number
    maxel_target_longitude: number
    maxel_target_latitude: number
    maxel_target_height: number
    maxel_target_azimuth: number
    maxel_target_elevation: number
    maxel_target_rangeSat: number
    calclated_datetime: Date
  }