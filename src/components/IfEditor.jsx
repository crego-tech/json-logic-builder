import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

import { useJsonLogicBuilderContext } from '../context';

import BranchEditor from './BranchEditor';
import GroupEditor from './GroupEditor';
import { GitBranch } from 'lucide-react';
import { ICON_STYLES } from '../constants';

const IfEditor = ({ node }) => {
    const { actions, readOnly } = useJsonLogicBuilderContext();

    return (
        <div className='rounded-2xl border-1 border-l-4 border-blue-500/20 border-l-blue-500 p-4'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className='flex items-center gap-2 text-sm font-semibold'>
                    <span className='flex items-center gap-2'>
                        <GitBranch size={ICON_STYLES.sm.size} />
                        Conditional Rule
                    </span>
                    <Badge variant='outline'>IF / THEN / ELSE</Badge>
                </div>
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-muted-foreground hover:text-destructive'
                    disabled={readOnly}
                    onClick={() => actions.removeNode(node.id)}>
                    Remove
                </Button>
            </div>
            <div className='mt-4 space-y-4'>
                <GroupEditor
                    group={node.condition}
                    title='IF'
                    variant='info'
                    depth={1}
                />
                <BranchEditor
                    label='THEN'
                    variant='success'
                    branch={node.then}
                    branchKey='then'
                    ifId={node.id}
                />
                <BranchEditor
                    label='ELSE'
                    variant='destructive'
                    branch={node.else}
                    branchKey='else'
                    ifId={node.id}
                />
            </div>
        </div>
    );
};

export default IfEditor;
