import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

import { cn } from '../lib/utils';

import { useJsonLogicBuilderContext } from '../context';

const SortableNode = ({ id, index, groupId, children }) => {
    const { readOnly } = useJsonLogicBuilderContext();
    const sortable = useSortable({
        id,
        disabled: readOnly,
        data: {
            groupId,
            sortable: {
                index,
                containerId: groupId,
            },
        },
    });

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = sortable;

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn('relative', isDragging && 'opacity-60')}>
            {!readOnly && (
                <button
                    type='button'
                    aria-label='Drag rule'
                    className='absolute left-2 top-2 z-10 inline-flex size-5 cursor-grab items-center justify-center text-muted-foreground'
                    {...attributes}
                    {...listeners}>
                    <GripVertical className='size-3.5' />
                </button>
            )}
            <div className={cn(!readOnly && 'pl-7')}>{children}</div>
        </div>
    );
};

export default SortableNode;
