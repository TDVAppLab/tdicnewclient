

// idで検索できるように埋め込むscript用の名前を定義
const SCRIPT1_NAME = 'tagheadsenseheader';

/** gtag.js読み込み用関数 */
export const GoogleAdHead = (googleAnalyticsId: string): void => {
  // scriptが既にある場合は一度削除
  document.getElementById(SCRIPT1_NAME)?.remove();

  // トラッキングID or 測定IDが空の場合は終了
  if (googleAnalyticsId === '') return;

  // gtag.jsをheadタグに埋め込み
  const script1 = document.createElement('script');
  script1.id = SCRIPT1_NAME;
  script1.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAnalyticsId}`;
  script1.async = true;
  script1.crossOrigin = "anonymous";
  document.head.appendChild(script1);

};
