import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class SiteAnalyticsStore {
    GoogleAnalyticsId: string | null=null;
    GoogleAdsensePublisherId: string | null=null;
    GoogleAdsenseUnitId: string | null=null;


    loading = false;

    constructor() {
        makeAutoObservable(this);

        this.loadGoogleAnalyticsId();
        this.loadGoogleAdsensePublisherId();

    }



    
    loadGoogleAnalyticsId = async () => {
        
        try {
            const object = await agent.WebsiteSettings.details("GOOGLE_ANALYTICS_ID_GA4");
            runInAction(()=>{
                this.GoogleAnalyticsId=object.data;
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    loadGoogleAdsensePublisherId = async () => {
        
        try {
            const object = await agent.WebsiteSettings.details("GOOGLE_ADSENSE_PUBLISHER_ID");
            runInAction(()=>{
                this.GoogleAdsensePublisherId=object.data;
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    
    loadGoogleAdsenseUnitId = async () => {
        
        try {
            const object = await agent.WebsiteSettings.details("GOOGLE_ANALYTICS_ID");
            runInAction(()=>{
                this.GoogleAdsenseUnitId=object.data;
            })
        } catch (error) {
            console.log(error);
        }
    }


}