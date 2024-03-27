import { TextField,Select,MenuItem,FormControl } from '@mui/material';
import React, { useState } from 'react';

export interface FormReport {
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
        <FormControl  variant="outlined">

            <Select
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"
                // value={age}
                label="Agdadadae"
                // onChange={handleChange}
                style={{ width: '100px', marginBottom: '5px' }}
                
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
            </Select>
            <TextField
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
