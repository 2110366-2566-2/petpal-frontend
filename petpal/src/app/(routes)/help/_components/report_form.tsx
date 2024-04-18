import { TextField,Select,MenuItem,FormControl,Radio,RadioGroup,FormControlLabel,FormLabel } from '@mui/material';
import React, { useState } from 'react';



export interface FormReport {
    type: string;
    description: string;
    photo: File | undefined;
}

interface ReportFormProps {
    formData: FormReport;
    handleChange: (formData: FormReport) => void;
}

export default function ReportForm({ formData, handleChange }: ReportFormProps) {
    const [description, setDescription] = useState(formData.description);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(formData.photo);
    const [selectedType, setSelectedType] = useState(formData.type);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setSelectedType(value);
        handleChange({
            ...formData,
            type: value,
        });
    }


    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;


        setDescription(value);
        handleChange({
            ...formData,
            description: value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file);
        handleChange({
            ...formData,
            photo: file,
        });
    };

    return (
        <FormControl  variant="outlined" style={{ maxWidth: '800px',width:'70%' }}  >


    <FormLabel >Trouble type</FormLabel>
    <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedType}
        onChange={handleRadioChange}
        defaultValue="website"
        
      >
         <FormControlLabel  value="system" control={<Radio  />} label="website" />
        <FormControlLabel value="service" control={<Radio />} label="service" />
       
      </RadioGroup>

            <TextField
                required
                label="Description"
                value={description}
                fullWidth
                className="mb-4"
                multiline
                rows={3}
                onChange={handleTextFieldChange}
            />

            <h6 className="pl-1">Photo Optional</h6>

            <input type="file" onChange={handleFileChange} />
        </FormControl >
    );
}
