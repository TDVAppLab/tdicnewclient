import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from '../../../app/stores/store';



export default observer( function EditViewList() {

    const { viewStore } = useStore();
    const { viewRegistry, setselectedView, selectedView } = viewStore;

    
    useEffect(()=>{
    }, [viewRegistry]);

    const handleInputChangeView=(id_view: number) => {
        setselectedView(id_view);
    }

    return (
        <div>
          
          <table className="table">

          <thead>
            <tr>
                <th>
                    No.
                </th>
                <th>
                    ID
                </th>
                <th>
                    Title
                </th>
                <th>
                    X
                </th>
                <th>
                    Y
                </th>
                <th>
                    Z
                </th>
                <th>
                    REf
                </th>
                <th>
                    Delete
                </th>
            </tr>
        </thead>
              <tbody>
                  {
                      Array.from(viewRegistry.values()).map(x=>(
                          <tr key={x.id_view}>
                              <td>{x.id_view}</td>
                              <td>{x.id_view}</td>
                              <td>{x.title}</td>
                              <td>{x.cam_pos_x.toFixed(4)}</td>
                              <td>{x.cam_pos_y.toFixed(4)}</td>
                              <td>{x.cam_pos_z.toFixed(4)}</td>
                              <td>
                                <button key={x.id_view}
                                        type = 'submit'
                                        className={ x.id_view === selectedView?.id_view ? "btn btn-secondary" :  "btn btn-outline-secondary"}
                                        onClick={()=>{handleInputChangeView(x.id_view)}} 
                                    >
                                    Edit
                                </button>
                              </td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>
    )
});