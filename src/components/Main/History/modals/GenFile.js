import React ,{useState} from 'react';
import "./GenFile.scss";
import TextField from '@material-ui/core/TextField';
import summary from "../../../../assets/summary.png";
import axios from "axios";
import CsvDownload from 'react-json-to-csv'

export default function GenFile({token , onClose}) {
    const [inputError , setError] = useState(false);
    const [validError , RaiseValidation] = useState(false);
    const [EndDate , setEndDate] = useState(`${new Date().getFullYear()}-01-01`);
    const [StartDate , setStartDate] = useState(`${new Date().getFullYear()}-01-01`);
    const [summaryData , setData] = useState([]);
    const [enableExport , showExportButton] = useState(false);

    const onSubmit = () =>{

        let start = new Date(StartDate);
        let end = new Date(EndDate);
        let deffrance =  Math.floor((end.getTime() - start.getTime() ) / 86400000); 
        let defaultDate = `${new Date().getFullYear()}-01-01`;

        if((StartDate === defaultDate ) && (EndDate === defaultDate )){
            RaiseValidation(false);
            setError(true);
        }
        else
        {
            if (deffrance < 0){
                setError(false);
                RaiseValidation(true);
            }
            else
            {
                    axios.get(`http://106.0.4.171:80/luna/getFaultsSummary/${StartDate}/${EndDate}/${token}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': `application/pdf`
                        },
                    }).then((response) => {
                        setData(response.data);
                        showExportButton(true);
                    }).catch((error) => { alert(error) })
            }
    };
    };
    return (
    <div className="GenFileModal">
      <div className="GenFileModal_content">
      <img src={summary} alt="" />
        <div className="GenFileModal_form">
          <div className="GenFileModal_form_item">
             <TextField
                id="start date"
                label="תאריך התחלה"
                type="date"
                defaultValue={`${new Date().getFullYear()}-01-01`}
                InputLabelProps={{shrink: true,}}
                onChange={(e) => setStartDate(e.target.value)}
             />
          </div>
          <div className="GenFileModal_form_item">
             <TextField
                id="end date"
                label="תאריך סיום"
                type="date"
                defaultValue={`${new Date().getFullYear()}-01-01`}
                InputLabelProps={{shrink: true,}}
                onChange={(e) => setEndDate(e.target.value)}
             />
            {inputError&&!validError&&<h1>נא לציין טווח תאריכים</h1>}
            {!inputError&&validError&&<h1>טווח תאריכים לא תקין</h1>}
            {!validError&&!inputError&&<h3>ציין טווח תאריכים לסיכום התקלות</h3>}
          </div>
        </div>
        <div className="GenFileModal_actions">
          <button onClick={onClose}>סגור</button>
          {!enableExport && <button onClick={onSubmit}>סכם</button>}
          {enableExport && <CsvDownload data={summaryData} filename="summary.csv" >יצא</CsvDownload>}
          
        </div>
      </div>
    </div>
    )
}

