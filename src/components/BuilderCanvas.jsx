import { DndContext, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';

import { Badge } from './ui/badge';

import { useJsonLogicBuilderContext } from '../context';

import GroupEditor from './GroupEditor';

const BuilderCanvas = () => {
    const { rootGroup, actions, stats } = useJsonLogicBuilderContext();

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 5 },
        }),
        useSensor(TouchSensor, {
            pressDelay: 150,
            pressTolerance: 10,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || !active || active.id === over.id) {
            return;
        }

        if (over.data?.current?.isDropZone) {
            actions.moveNodeToGroup(active.id, over.data.current.groupId);
            return;
        }

        const activeSortable = active.data.current?.sortable;
        const overSortable = over.data.current?.sortable;

        if (!activeSortable || !overSortable) {
            return;
        }

        const fromGroup = activeSortable.containerId;
        const toGroup = overSortable.containerId;

        if (!fromGroup || !toGroup) {
            return;
        }

        if (fromGroup === toGroup) {
            actions.reorderWithinGroup(fromGroup, activeSortable.index, overSortable.index);
            return;
        }

        actions.moveNodeToGroup(active.id, toGroup, overSortable.index);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}>
            <div className='space-y-6'>
                <div className='flex flex-wrap items-center gap-2'>
                    <Badge variant='outline'>{stats.rules} rules</Badge>
                    <Badge variant='outline'>{stats.conditions} conditions</Badge>
                    <Badge variant='outline'>{stats.groups} groups</Badge>
                </div>
                <GroupEditor
                    group={rootGroup}
                    title='Policy Rules'
                    depth={0}
                    isRoot
                />
            </div>
        </DndContext>
    );
};

export default BuilderCanvas;
