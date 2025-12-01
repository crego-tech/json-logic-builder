import { useMemo } from 'react';

import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

import FieldSelect from './FieldSelect';

const VALUE_SOURCES = [
    { value: 'value', label: 'Value' },
    { value: 'field', label: 'Field' },
];

const CompareValueInput = ({
    rule,
    onChange,
    fieldOptions,
    readOnly = false,
    showLabel = true,
}) => {
    const sourceLabel = useMemo(
        () => VALUE_SOURCES.find((source) => source.value === rule.valueSource)?.label,
        [rule.valueSource]
    );

    return (
        <div className='flex flex-col gap-2'>
            {showLabel && <Label className='text-xs uppercase text-muted-foreground'>Compare</Label>}
            <div className='flex flex-col gap-2'>
                <Select
                    value={rule.valueSource}
                    disabled={readOnly}
                    onValueChange={(nextValue) =>
                        onChange({
                            valueSource: nextValue,
                            value: '',
                        })
                    }
                >
                    <SelectTrigger className='h-8 text-xs'>
                        <SelectValue placeholder='Source' />
                    </SelectTrigger>
                    <SelectContent>
                        {VALUE_SOURCES.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {rule.valueSource === 'field' ? (
                    <FieldSelect
                        value={rule.value}
                        onChange={(value) => onChange({ value })}
                        options={fieldOptions}
                        placeholder='Select field'
                        disabled={readOnly}
                    />
                ) : (
                    <Input
                        value={rule.value ?? ''}
                        onChange={(event) => onChange({ value: event.target.value })}
                        placeholder={`Enter ${sourceLabel?.toLowerCase() ?? 'value'}`}
                        disabled={readOnly}
                    />
                )}
            </div>
        </div>
    );
};

export default CompareValueInput;

