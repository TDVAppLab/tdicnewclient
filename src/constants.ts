export const ContextMode =
  process.env.NEXT_PUBLIC_CONTEXT_MODE || process.env.NODE_ENV || 'none'

/**
 * 本番環境以外の場合にtrueとなるフラグ
 * (本番/検証環境の識別・フィーチャーフラグなどの目的での使用を想定)
 */
export const IsAvailableWithoutProduction = ContextMode !== 'IN_PRODUCTION'

/**
 * UPDATESをDBから取得するかどうかのフラグ
 */
export const IsUseUpdatesSrcDb =
  process.env.NEXT_PUBLIC_UPDATES_SRC_DB === 'true'

// Google Analyticsの測定ID
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID || ''

// 供用されるような定数を定義する
// ※環境変数の様に秘匿する必要のあるものはここには定義しない

// ECEFのサイズをCanvasのサイズに合わせるための係数
export const SCALEofECEFtoCanvas = 0.0001

//カメラの初期位置
export const CameraDefaultPosX = 3180000 * SCALEofECEFtoCanvas
export const CameraDefaultPosY = 4210000 * SCALEofECEFtoCanvas
export const CameraDefaultPosZ = -4560000 * SCALEofECEFtoCanvas

//ターゲットの初期位置
const TargetDefaultPosEcefX = -3783424 * SCALEofECEFtoCanvas
const TargetDefaultPosEcefY = 2804039 * SCALEofECEFtoCanvas
const TargetDefaultPosEcefZ = 4287261 * SCALEofECEFtoCanvas

export const TargetDefaultPosX = TargetDefaultPosEcefY
export const TargetDefaultPosY = TargetDefaultPosEcefZ
export const TargetDefaultPosZ = TargetDefaultPosEcefX

//地球の半径
export const RadiusEarthOnCanvas = 6378137 * SCALEofECEFtoCanvas

// リフレッシュインターバル
export const REFRESH_INTERVAL = 100 // ms



export const APIURL =
  process.env.NEXT_PUBLIC_REACT_APP_API_URL || '/api'