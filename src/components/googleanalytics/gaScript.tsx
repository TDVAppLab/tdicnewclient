import Script from 'next/script'

interface Props {
  GA_MEASUREMENT_ID: string
}

export default function GaScript({ GA_MEASUREMENT_ID }: Props) {
  return (
    <>
      {/* Google Analyticsのスクリプト */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GA_MEASUREMENT_ID}');
    `,
        }}
        id="google-analytics-config"
      />
    </>
  )
}
