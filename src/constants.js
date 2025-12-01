export const NODE_TYPES = {
    GROUP: 'group',
    RULE: 'rule',
    IF: 'if',
    RESULT: 'result',
};

export const BRANCH_MODES = {
    RULES: 'rules',
    VALUE: 'value',
};

export const LOGICAL_COMBINATORS = [
    { value: 'and', label: 'All (AND)' },
    { value: 'or', label: 'Any (OR)' },
    { value: 'not', label: 'Negate result (NOT)' },
];

export const COMPARISON_OPERATORS = [
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: '>', label: '>' },
    { value: '>=', label: '>=' },
    { value: '<', label: '<' },
    { value: '<=', label: '<=' },
    { value: 'in', label: 'in' },
];

export const DEFAULT_RESULT_VALUE = 'APPROVE';

export const ICON_STYLES = {
    sm: { size: 16 },
};
