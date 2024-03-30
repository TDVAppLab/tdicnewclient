import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import GoogleAd from '@/app/common/utils/GoogleAd';
import { useStore } from '@/app/stores/store';
import ArticleList from '@/components/Articles/dashboard/ArticleList';
import LoadingComponent from '@/components/layout/LoadingComponents';


export default observer(function ArticleDashboard() {      

    
    const {siteAnalyticsStore} = useStore();
    
    const {articleStore} = useStore();
    const {loadArticles, articleRegistry} = articleStore;
    const {userStore: {user}} = useStore();
  
    useEffect(() => {
        if(articleRegistry.size <= 1) loadArticles();
    },[articleRegistry.size, loadArticles])
  
  
    if(articleStore.loading) return <LoadingComponent content='Loading articles...' />



    return(
        <Container>
            {
                user &&
                    <>            
                        <Link href={`/articleedit`}>
                            <h3>Create New Article</h3>
                        </Link>
                        <hr />                        
                    </>
            }
            
            <ArticleList />
            {
            <GoogleAd pid={siteAnalyticsStore.GoogleAdsensePublisherId!} uid={siteAnalyticsStore.GoogleAdsenseUnitId!} />
            }
        </Container>

        
    )
})