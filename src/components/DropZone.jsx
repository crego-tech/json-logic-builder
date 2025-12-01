import { useDroppable } from '@dnd-kit/core';

import { cn } from '../lib/utils';

const DropZone = ({ groupId, isEmpty = false }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `${groupId}-dropzone`,
        data: {
            isDropZone: true,
            groupId,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                'rounded-lg border border-dashed border-muted-foreground/40 px-4 py-3 text-center text-xs text-muted-foreground transition-colors',
                isOver && 'border-primary bg-primary/5 text-primary',
                isEmpty && 'py-6'
            )}>
            {isEmpty ? 'Drag rules here' : 'Drop here to move'}
        </div>
    );
};

export default DropZone;
