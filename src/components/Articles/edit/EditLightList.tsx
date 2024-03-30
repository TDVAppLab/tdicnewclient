import { observer } from 'mobx-react-lite';

import { useStore } from '../../../app/stores/store';



export default observer( function EditLightList() {

    const { lightStore } = useStore();
    const { lightRegistry, selectedLight, setSelectedLight } = lightStore;

    const handleInputChangeLight=(id_light: number) => {
        setSelectedLight(id_light);
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
                          type
                      </th>
                      <th>
                          Title
                      </th>
                      <th>
                          Edit
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {
                      Array.from(lightRegistry.values()).map(x=>(
                          <tr key={x.id_light}>
                              <td>{x.id_light}</td>
                              <td>{x.light_type}</td>
                              <td>{x.title}</td>
                              <td>
                                <button key={x.id_light}
                                        type = 'submit'
                                        className={ x.id_light === selectedLight?.id_light ? "btn btn-secondary" :  "btn btn-outline-secondary"}
                                        onClick={()=>{handleInputChangeLight(x.id_light)}} 
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



//export default EdiaAnnotationDisplay;