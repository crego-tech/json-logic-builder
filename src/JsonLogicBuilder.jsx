import { useMemo } from 'react';

import BuilderCanvas from './components/BuilderCanvas';
import { COMPARISON_OPERATORS } from './constants';
import { JsonLogicBuilderProvider } from './context';
import useJsonLogicBuilder from './hooks/useJsonLogicBuilder';

const JsonLogicBuilder = ({ rule, fields = [], readOnly = false, onChange, storeKeys = [] }) => {
    const fieldOptions = useMemo(() => {
        const allFields = [...(storeKeys || []), ...(fields || [])];
        const unique = new Map();

        allFields.forEach((field) => {
            if (!field || !field.value) return;

            const option = {
                value: field.value,
                label: field.label || field.value,
                group: field.group ? field.group.toUpperCase() : 'FIELDS',
            };

            if (!unique.has(option.value)) {
                unique.set(option.value, option);
            }
        });

        return [...unique.values()];
    }, [fields, storeKeys]);
    const builder = useJsonLogicBuilder({ rule, onChange });

    const providerValue = useMemo(
        () => ({
            ...builder,
            readOnly,
            options: {
                fields: fieldOptions,
                operators: COMPARISON_OPERATORS,
            },
        }),
        [builder, fieldOptions, readOnly]
    );

    return (
        <JsonLogicBuilderProvider value={providerValue}>
            <BuilderCanvas />
        </JsonLogicBuilderProvider>
    );
};

export default JsonLogicBuilder;
