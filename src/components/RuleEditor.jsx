import { Plus, Settings2, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import CompareValueInput from './CompareValueInput';
import FieldSelect from './FieldSelect';

import { useJsonLogicBuilderContext } from '../context';

const RuleEditor = ({ rule }) => {
    const { options, actions, readOnly } = useJsonLogicBuilderContext();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const fieldMeta = useMemo(
        () => options.fields.find((option) => option.value === rule.field),
        [options.fields, rule.field]
    );

    const operatorMeta = useMemo(
        () => options.operators.find((operator) => operator.value === rule.operator),
        [options.operators, rule.operator]
    );

    const isEmptyRule = !rule.field && (!rule.value || rule.value === '') && (!rule.operator || rule.operator === '==');

    const configForm = (
        <div className='space-y-4'>
            <div>
                <p className='text-sm font-semibold'>Edit rule</p>
                <p className='text-xs text-muted-foreground'>Update the field, operator, and comparison target.</p>
            </div>
            <div className='space-y-3'>
                <div className='flex flex-col gap-2'>
                    <Label className='text-xs uppercase text-muted-foreground'>Parameter</Label>
                    <FieldSelect
                        value={rule.field}
                        options={options.fields}
                        onChange={(value) => actions.updateRule(rule.id, { field: value })}
                        disabled={readOnly}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label className='text-xs uppercase text-muted-foreground'>Operator</Label>
                    <Select
                        value={rule.operator}
                        disabled={readOnly}
                        onValueChange={(value) => actions.updateRule(rule.id, { operator: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder='Operator' />
                        </SelectTrigger>
                        <SelectContent>
                            {options.operators.map((operator) => (
                                <SelectItem
                                    key={operator.value}
                                    value={operator.value}>
                                    {operator.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <CompareValueInput
                    rule={rule}
                    readOnly={readOnly}
                    fieldOptions={options.fields}
                    onChange={(payload) => actions.updateRule(rule.id, payload)}
                />
            </div>
        </div>
    );

    const renderPopover = (trigger) => (
        <Popover
            open={isPopoverOpen && !readOnly}
            onOpenChange={(value) => !readOnly && setIsPopoverOpen(value)}>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            {!readOnly && (
                <PopoverContent
                    align='end'
                    className='w-[360px] space-y-4'>
                    {configForm}
                </PopoverContent>
            )}
        </Popover>
    );

    if (isEmptyRule) {
        return (
            <div className='group relative rounded-2xl border border-dashed border-border/60 bg-transparent p-4'>
                {renderPopover(
                    <button
                        type='button'
                        disabled={readOnly}
                        className='flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-border/60 bg-card/40 py-8 text-muted-foreground transition hover:border-primary hover:text-primary'>
                        <Plus className='size-5' />
                        <span className='text-sm font-medium'>Add rule details</span>
                    </button>
                )}
                <div className='absolute right-3 top-3 opacity-0 transition group-hover:opacity-100'>
                    <Button
                        type='button'
                        variant='ghost'
                        size='iconSm'
                        className='text-muted-foreground hover:text-destructive'
                        disabled={readOnly}
                        onClick={() => actions.removeNode(rule.id)}>
                        <Trash2 className='size-4' />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='group relative rounded-2xl border border-border/50 bg-card/40 p-2 shadow-xs transition'>
                <div className='flex flex-wrap items-center justify-between gap-2 text-xs'>
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-foreground'>
                            {fieldMeta?.label || rule.field || 'Select a field'}
                        </p>
                        {operatorMeta?.label && <Badge variant='outline'>{rule.operator}</Badge>}
                        {rule.value}
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2 opacity-0 transition group-hover:opacity-100'>
                            {renderPopover(
                                <Button
                                    type='button'
                                    variant='outline'
                                    size='iconXs'
                                    disabled={readOnly}
                                    className='text-muted-foreground hover:text-foreground'>
                                    <Settings2 />
                                </Button>
                            )}
                            <Button
                                type='button'
                                variant='destructive'
                                size='iconXs'
                                className='text-muted-foreground hover:text-destructive'
                                disabled={readOnly}
                                onClick={() => actions.removeNode(rule.id)}>
                                <Trash2 color='white' />
                            </Button>
                        </div>
                        {fieldMeta?.group && <Badge variant='outline'>{fieldMeta.group}</Badge>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RuleEditor;
