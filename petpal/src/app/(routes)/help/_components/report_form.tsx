
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, TextField } from '@mui/material';




export default function ReportForm() {


    return (
        <form 
        //onSubmit={handleReportSubmit} //className={styles.form}
        >
          
          <TextField label="Subject"
            value={''}
            variant="outlined"
            fullWidth
            className="mb-4"
            >

            </TextField>

            <TextField
            label="Description"
            value={''}
            variant="outlined"
            fullWidth        
            className="mb-4"
            >

            </TextField>

            <h6 className='pl-1'>
            Photo Optional
            </h6>

            <TextField  type="file" />

        </form>

    );
}


