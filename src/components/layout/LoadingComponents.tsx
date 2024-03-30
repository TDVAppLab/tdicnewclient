import { Spinner } from 'react-bootstrap';

interface Props {
    inverted?: boolean;
    content?: string;
}


export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props){
    return(
        <div>
            <p>{content}</p>
            <Spinner animation="border" />
        </div>
    )
}