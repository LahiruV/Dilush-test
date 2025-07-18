import { Calendar } from "primereact/calendar";

export const DateFilterTemplate = (options: any) => {    
    let date = new Date();
    if(options.value){
        if(options.value.toString().indexOf('/') > -1){
            const dateArr = options.value.split('/');
            date = new Date(dateArr[2], (dateArr[1]-1), dateArr[0]);
        }
        else{
            date = new Date(options.value);
        }        
    }
    return (
        <Calendar
          value={date}
          onChange={(e) => {
            options.filterCallback(e.value);
          }}
          dateFormat="dd/mm/yy"
        />
    );      
};