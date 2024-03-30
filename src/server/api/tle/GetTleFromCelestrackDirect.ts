import type { PrismaClient } from '@prisma/client'
import axios from 'axios'

export const URL_NORAD_ACTIVESAT_3LE =
  'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle'
/**
 * celestrakのサーバーからTLE情報を取得する。
 */
export async function GetTleFromCelestrackDirect(
  id: string,
): Promise<string[]> {
  // celestrackのサイトから、3行モード(オブジェクト名+2行モード)でデータを取得
  // JSONで取得していない理由は、この後TLE文字列から「緯度・経度」を出す際のライブラリが
  // どれも2行モードにのみ対応しているため。
  // (※01もこうやっていた模様)
  const tle3le = await get3lelinestrings(id)

  return tle3le
}

/**
 * celestrakのサーバーから3行形式でTLE情報を取得する。
 */
async function get3lelinestrings(id: string): Promise<string[]> {
  const res = await axios.get<string>(
    `https://celestrak.org/NORAD/elements/gp.php?CATNR=${id}&FORMAT=tle`,
  )
  const data = res.data
  const lines = data.split(/\r\n|\n/)
  return lines
}

/**
 * celestrakのサーバーから3行形式でTLE情報を取得する。
 */
async function get3lelineStringsAll(): Promise<string[]> {
  const res = await axios.get<string>(URL_NORAD_ACTIVESAT_3LE)
  const data = res.data
  const lines = data.split(/\r\n|\n/)
  return lines
}

/**
 * celestrakのサーバーからActiveな衛星のTLE情報を取得して、テーブルに格納する。
 * すでにデータが存在する場合は上書きする。
 * Activeではない衛星のTLEを消す機能はない。将来的に実装要
 */
export async function UpdateTleTableFromCelestrack({
  db,
}: {
  db: PrismaClient
}): Promise<void> {
  // celestrackのサイトから、3行モード(オブジェクト名+2行モード)でデータを取得
  // JSONで取得していない理由は、この後TLE文字列から「緯度・経度」を出す際のライブラリが
  // どれも2行モードにのみ対応しているため。
  // (※01もこうやっていた模様)

  const tle3le = await get3lelineStringsAll()

  const start = new Date()

  for (let i = 0; i < tle3le.length - 1; i = i + 3) {
    const satellite = {
      name: tle3le[i] || '',
      noradCatalogNumber: Number(tle3le[i + 1]?.substring(2, 7)),
      tleObjectName: tle3le[i] || '',
      tleLine1: tle3le[i + 1] || '',
      tleLine2: tle3le[i + 2] || '',
      syncedAt: new Date(Date.now()),
    }

    await db.satellite.upsert({
      where: { noradCatalogNumber: satellite.noradCatalogNumber },
      update: satellite,
      create: satellite,
    })
  }

  const finished = new Date()

  await db.applicationLog.create({
    data: {
      key: 'TleUpdateBatch',
      message: `Start : ${start.toString()}Operated : Manually All Satellites`,
      createdAt: finished,
      updatedAt: finished,
    },
  })

  return
}
