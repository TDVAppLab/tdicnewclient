import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useLayoutSizeContext } from '@/store/layoutsizeprovider'
import style from '@/styles/Footer.module.scss'

import { useLocale } from '../utils/useLocale'

export default function Footer() {
  const layoutSize = useLayoutSizeContext()
  const ref = useRef<HTMLDivElement>(null)

  const { t } = useLocale()

  //Windowサイズを取得する
  const { height, width } = useWindowSize()

  useEffect(() => {
    if (ref.current) {
      //console.log(ref.current.getBoundingClientRect())
      layoutSize.setFooterHight(ref.current.getBoundingClientRect().height)
    }
  }, [height, width])

  return (
    <footer ref={ref} className={style.footer}>
      <div className={style.footerInner}>
        <div className={style.footerStart}>
          <ul className={style.footerNaviList}>
            <li className={style.footerNaviItem}>
              <Link href="/" target="_blank">
                {
                  //プライバシーポリシー
                  t.FooterNaviPrivacyPolicy
                }
              </Link>
            </li>
          </ul>
        </div>

        {
          <div className={style.footerCenter}>
            <ul className={style.footerSnsList}>
              <li className={style.footerSnsItem}>
                <Link href="https://twitter.com" target="_blank">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        }

        <div className={style.footerEnd}>
          <p className={style.footerCopyRight}>Sattrack © 2024</p>
        </div>
      </div>
    </footer>
  )
}
