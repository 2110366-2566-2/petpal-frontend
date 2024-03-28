import { TextField,Select,MenuItem,FormControl,Radio,RadioGroup,FormControlLabel } from '@mui/material';
import React, { useState } from 'react';



export interface RefundReport {
    description: string;
    photo: File | undefined;
}

interface RefundFormProps {
    formData: RefundReport;
    handleChange: (formData: RefundReport) => void;
}

export default function RefundForm({ formData, handleChange }: RefundFormProps) {
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
        <FormControl  variant="outlined" style={{ maxWidth: '800px',width:'70%' }}>


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
