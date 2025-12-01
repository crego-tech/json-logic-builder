import { useMemo, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '../components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { cn } from '../lib/utils';

const toGroups = (options = [], query = '') => {
    const normalizedQuery = query.trim().toLowerCase();
    const groups = new Map();

    options.forEach((option) => {
        if (
            normalizedQuery &&
            !option.label.toLowerCase().includes(normalizedQuery) &&
            !option.value.toLowerCase().includes(normalizedQuery)
        ) {
            return;
        }

        const groupName = option.group || 'Application';
        const current = groups.get(groupName) ?? [];

        current.push(option);
        groups.set(groupName, current);
    });

    return groups;
};

const FieldSelect = ({
    value,
    onChange,
    options,
    placeholder = 'Select parameter',
    disabled = false,
    triggerClassName,
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const selected = useMemo(
        () => options.find((option) => option.value === value),
        [options, value]
    );

    const grouped = useMemo(() => toGroups(options, search), [options, search]);

    const handleSelect = (nextValue) => {
        onChange?.(nextValue);
        setOpen(false);
    };

    const showCustom = search && !options.some((option) => option.value === search);

    return (
        <Popover open={open} onOpenChange={(nextOpen) => !disabled && setOpen(nextOpen)}>
            <PopoverTrigger asChild>
                <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    disabled={disabled}
                    className={cn(
                        'w-full justify-between text-left font-normal',
                        !selected && 'text-muted-foreground',
                        triggerClassName
                    )}
                >
                    <span className='truncate'>
                        {selected ? selected.label : placeholder}
                    </span>
                    <ChevronsUpDown className='size-4 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[320px] p-0' align='start'>
                <Command shouldFilter={false}>
                    <CommandInput
                        value={search}
                        onValueChange={setSearch}
                        placeholder='Search fields...'
                    />
                    <CommandList>
                        <CommandEmpty>No matching fields</CommandEmpty>
                        {[...grouped.entries()].map(([groupName, groupOptions]) => (
                            <CommandGroup key={groupName} heading={groupName}>
                                {groupOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                    >
                                        <span className='flex-1 truncate'>{option.label}</span>
                                        <Check
                                            className={cn(
                                                'size-4',
                                                option.value === value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))}
                        {showCustom && (
                            <>
                                <CommandSeparator />
                                <CommandGroup heading='Custom'>
                                    <CommandItem value={search} onSelect={() => handleSelect(search)}>
                                        Use “{search}”
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default FieldSelect;

