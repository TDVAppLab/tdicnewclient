import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { useStore } from "../../stores/store";

const useTrackingGA4 = () => {
  const location = useLocation();
  const {siteAnalyticsStore} = useStore();

  useEffect(() => {
    // Google Analytics 測定 ID を入力して設定
    if(siteAnalyticsStore.GoogleAnalyticsId){
        ReactGA.initialize(siteAnalyticsStore.GoogleAnalyticsId);
    }
  }, [siteAnalyticsStore.GoogleAnalyticsId]);


  useEffect(() => {
//    console.log(location);
    ReactGA.send({
      hitType: "pageview",
      // アクセスしたパス (pathname) とクエリ文字列 (search) を送付する (必要に応じて編集する)
      page: location.pathname + location.search,
    });
  }, [location]);
};

export default useTrackingGA4;