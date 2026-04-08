import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText, OutlinedInput, Chip } from "@mui/material";

interface SelectMultipleProps<T> {
    name: string;
    label: string;
    formik: any;
    options: T[];
    getOptionValue: (option: T) => string | number;
    getOptionLabel: (option: T) => string;
    loading?: boolean;
    disabled?: boolean;
}

const SelectMultiple = <T,>({
    name,
    label,
    formik,
    options,
    getOptionValue,
    getOptionLabel,
    loading = false,
    disabled = false
}: SelectMultipleProps<T>) => {
    const error = formik.touched[name] && Boolean(formik.errors[name]);
    const value = formik.values[name] || [];

    const handleSelectChange = (e: any) => {
        const val = e.target.value;
        const selected = Array.isArray(val) ? val : [val];
        formik.setFieldValue(name, selected);
    };

    const handleDelete = (valToDelete: string | number) => {
        const newValue = value.filter((v: any) => v !== valToDelete);
        formik.setFieldValue(name, newValue);
    };

    const labelId = `select-multiple-label-${name}`;

    return (
        <FormControl fullWidth error={error} sx={{ mb: 2 }}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                id={name}
                name={name}
                multiple
                value={value}
                onChange={handleSelectChange}
                input={<OutlinedInput id={`select-multiple-chip-${name}`} label={label} />}
                renderValue={(selected) => (
                    <Box 
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }} 
                        onMouseDown={(e) => e.stopPropagation()} 
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {Array.isArray(selected) && selected.map((val) => {
                            const option = options.find((opt) => getOptionValue(opt) === val);
                            const displayLabel = option ? getOptionLabel(option) : val;
                            return (
                                <Chip 
                                    key={val} 
                                    label={displayLabel} 
                                    size="small" 
                                    onDelete={() => handleDelete(val)} 
                                    disabled={disabled} 
                                />
                            );
                        })}
                    </Box>
                )}
                disabled={disabled}
            >
                {loading ? (
                    <MenuItem disabled>Cargando opciones...</MenuItem>
                ): (
                    options.map((option) => {
                        const val = getOptionValue(option);
                        const displayLabel = getOptionLabel(option);
                        return (
                            <MenuItem 
                                key={val} 
                                value={val} 
                                disabled={value.includes(val)}
                            >
                                {displayLabel}
                            </MenuItem>
                        );
                    })
                )}
            </Select>
            {error && (
                <FormHelperText>{formik.errors[name]}</FormHelperText>
            )}
        </FormControl>
    );
};

{/* 
    Ejemplo de uso:
    
    <SelectMultiple
        name="selectedUsers"
        label="Usuarios"
        formik={formik}
        options={users} // e.g. [{ id: 1, name: 'Juan' }, { id: 2, name: 'Ana' }]
        getOptionValue={(u) => u.id}
        getOptionLabel={(u) => u.name}
        loading={loading}
    /> 
*/}

export default SelectMultiple;
