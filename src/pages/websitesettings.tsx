import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import agent from '@/app/api/agent';
import type { WebsiteSetting } from '@/app/models/WebsiteSetting';
import LoadingComponent from '@/components/layout/LoadingComponents';

export default function WebsiteSettingDashboard() {

    const [websiteSettings, setWebsiteSettings] = useState<WebsiteSetting[]>();
  
    useEffect(() => {
        agent.WebsiteSettings.list().then(sitesettings => {
            sitesettings.length > 0 && setWebsiteSettings(sitesettings);
        })
    },[])  
  

    if(!websiteSettings) return <LoadingComponent />

    return(
        <Container>
            
            
        <Link href="/websitesettingedit">
            <h3 >Create</h3>
        </Link>
            <hr />



            <table className="table">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Memo
                        </th>
                        <th>
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                {                                
                    websiteSettings && websiteSettings?.map((x,index)=>(                        

                        <tr key={x.title}>
                            <td>{index+1}</td>
                            <td>{x.title}</td>
                            <td>{x.memo}</td>
                            <td><Link href={`/websitesettingedit/${x.title}`}>Edit</Link></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </Container>

        
    )
}