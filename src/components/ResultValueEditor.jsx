import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import { useJsonLogicBuilderContext } from '../context';

const ResultValueEditor = ({ node }) => {
    const { actions, readOnly } = useJsonLogicBuilderContext();

    return (
        <div className='rounded-lg border border-dashed border-muted-foreground/40 bg-muted/20 p-4'>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                    <Badge variant='outline'>Result</Badge>
                    <span>Return value</span>
                </div>
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='text-muted-foreground hover:text-destructive'
                    disabled={readOnly}
                    onClick={() => actions.removeNode(node.id)}
                >
                    Remove
                </Button>
            </div>
            <div className='mt-3 flex flex-col gap-2'>
                <Label className='text-xs uppercase text-muted-foreground'>Value</Label>
                <Input
                    value={node.value ?? ''}
                    onChange={(event) => actions.updateResultNode(node.id, event.target.value)}
                    placeholder='Approve / Decline / Custom token'
                    disabled={readOnly}
                />
            </div>
        </div>
    );
};

export default ResultValueEditor;

