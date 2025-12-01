import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import { BRANCH_MODES } from '../constants';
import { useJsonLogicBuilderContext } from '../context';

import GroupEditor from './GroupEditor';
import { cn } from '../lib/utils';

const branchOptions = [
    { label: 'Apply rules', value: BRANCH_MODES.RULES },
    { label: 'Return value', value: BRANCH_MODES.VALUE },
];

const BranchEditor = ({ label, branch, ifId, branchKey, variant }) => {
    const { actions, readOnly } = useJsonLogicBuilderContext();

    return (
        <div
            className={cn('rounded-lg border-2 border-dashed border-border p-4 transition-all duration-200', {
                'hover:border-green-500': variant === 'success',
                'hover:border-red-500': variant === 'destructive',
            })}>
            <div className='flex items-center gap-2 text-sm font-semibold'>
                <Badge variant={`${variant}_fill`}>{label}</Badge>
                <Select
                    value={branch.mode}
                    disabled={readOnly}
                    onValueChange={(mode) => actions.updateBranchMode(ifId, branchKey, mode)}>
                    <SelectTrigger className='mt-1 h-8 text-xs'>
                        <SelectValue placeholder='Mode' />
                    </SelectTrigger>
                    <SelectContent>
                        {branchOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {branch.mode === BRANCH_MODES.VALUE && (
                    <Input
                        className='mt-2'
                        value={branch.value ?? ''}
                        disabled={readOnly}
                        placeholder='Approve / Decline / Custom token'
                        onChange={(event) => actions.updateBranchValue(ifId, branchKey, event.target.value)}
                    />
                )}
            </div>
            {branch.mode === BRANCH_MODES.RULES && (
                <div className='mt-4'>
                    <GroupEditor
                        group={branch.group}
                        title='Apply Rules'
                        depth={1}
                        isBranch
                    />
                </div>
            )}
        </div>
    );
};

export default BranchEditor;
