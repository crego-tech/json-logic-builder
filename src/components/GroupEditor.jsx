import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { cn } from '../lib/utils';

import { LOGICAL_COMBINATORS } from '../constants';
import { useJsonLogicBuilderContext } from '../context';

import CompareValueInput from './CompareValueInput';
import FieldSelect from './FieldSelect';
import IfEditor from './IfEditor';
import ResultValueEditor from './ResultValueEditor';
import RuleEditor from './RuleEditor';
import SortableNode from './SortableNode';

const NodeRenderer = ({ node, depth }) => {
    const { nodeTypes } = useJsonLogicBuilderContext();

    switch (node.type) {
        case nodeTypes.RULE:
            return <RuleEditor rule={node} />;
        case nodeTypes.GROUP:
            return (
                <GroupEditor
                    group={node}
                    title='Nested group'
                    depth={depth + 1}
                />
            );
        case nodeTypes.IF:
            return <IfEditor node={node} />;
        case nodeTypes.RESULT:
            return <ResultValueEditor node={node} />;
        default:
            return null;
    }
};

const GroupEditor = ({ group, title = 'Rule group', depth = 0, isRoot = false, isBranch = false, variant }) => {
    const { actions, readOnly, options } = useJsonLogicBuilderContext();
    const childIds = group.children.map((child) => child.id);
    const limitReached = group.combinator === 'not' && group.children.length >= 1;
    const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
    const [draftRule, setDraftRule] = useState({
        field: '',
        operator: '==',
        valueSource: 'value',
        value: '',
    });

    const resetDraft = () => {
        setDraftRule({
            field: '',
            operator: '==',
            valueSource: 'value',
            value: '',
        });
    };

    const handleAddRule = () => {
        if (!draftRule.field) {
            return;
        }

        actions.addRule(group.id, draftRule);
        resetDraft();
        setIsAddRuleOpen(false);
    };

    return (
        <div
            className={cn(
                'space-y-4 rounded-2xl border border-dashed border-muted-foreground/40 p-4',
                depth === 0 ? 'bg-background' : 'bg-muted/30'
            )}>
            <div className='flex flex-wrap items-center justify-between gap-3'>
                <div className='flex flex-wrap items-center gap-3 text-sm font-semibold'>
                    <Badge variant={`${variant}_fill`}>{title}</Badge>
                    <span className='text-muted-foreground'>
                        {group.children.length} item
                        {group.children.length === 1 ? '' : 's'}
                    </span>
                    <div className='flex items-center gap-2'>
                        <Label className='text-xs uppercase text-muted-foreground'>Join</Label>
                        <Select
                            value={group.combinator}
                            disabled={readOnly}
                            onValueChange={(value) => actions.updateGroup(group.id, { combinator: value })}>
                            <SelectTrigger className='h-8 min-w-[140px] text-xs'>
                                <SelectValue placeholder='Combinator' />
                            </SelectTrigger>
                            <SelectContent>
                                {LOGICAL_COMBINATORS.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {!isRoot && !isBranch && (
                    <Button
                        type='button'
                        variant='ghost'
                        size='iconSm'
                        className='text-muted-foreground hover:text-destructive'
                        disabled={readOnly}
                        onClick={() => actions.removeNode(group.id)}>
                        <Trash2 className='size-4' />
                    </Button>
                )}
            </div>

            <div className='space-y-3'>
                {childIds.length ? (
                    <>
                        <SortableContext
                            id={group.id}
                            items={childIds}
                            strategy={verticalListSortingStrategy}>
                            {group.children.map((child, index) => (
                                <SortableNode
                                    key={child.id}
                                    id={child.id}
                                    groupId={group.id}
                                    index={index}>
                                    <NodeRenderer
                                        node={child}
                                        depth={depth}
                                    />
                                </SortableNode>
                            ))}
                        </SortableContext>
                        {/* <DropZone groupId={group.id} /> */}
                    </>
                ) : (
                    {
                        /* <DropZone
                        groupId={group.id}
                        isEmpty
                    /> */
                    }
                )}
            </div>
            <div className='flex flex-wrap items-center gap-2'>
                <Popover
                    open={isAddRuleOpen && !readOnly && !limitReached}
                    onOpenChange={(value) => !readOnly && setIsAddRuleOpen(value)}>
                    <PopoverTrigger asChild>
                        <Button
                            type='button'
                            size='sm'
                            variant='outline'
                            disabled={readOnly || limitReached}>
                            <Plus className='mr-2 size-4' />
                            Rule
                        </Button>
                    </PopoverTrigger>
                    {!readOnly && !limitReached && (
                        <PopoverContent
                            align='start'
                            className='w-[360px] space-y-4'>
                            <div>
                                <p className='text-sm font-semibold'>Add rule</p>
                                <p className='text-xs text-muted-foreground'>
                                    Choose a parameter, operator, and comparison target.
                                </p>
                            </div>
                            <div className='space-y-3'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-xs uppercase text-muted-foreground'>Parameter</Label>
                                    <FieldSelect
                                        value={draftRule.field}
                                        options={options.fields}
                                        onChange={(value) => setDraftRule((prev) => ({ ...prev, field: value }))}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-xs uppercase text-muted-foreground'>Operator</Label>
                                    <Select
                                        value={draftRule.operator}
                                        onValueChange={(value) =>
                                            setDraftRule((prev) => ({ ...prev, operator: value }))
                                        }>
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
                                    rule={draftRule}
                                    readOnly={false}
                                    fieldOptions={options.fields}
                                    onChange={(payload) => setDraftRule((prev) => ({ ...prev, ...payload }))}
                                />
                                <Button
                                    type='button'
                                    className='w-full'
                                    disabled={!draftRule.field}
                                    onClick={handleAddRule}>
                                    Add rule
                                </Button>
                            </div>
                        </PopoverContent>
                    )}
                </Popover>
                <Button
                    type='button'
                    size='sm'
                    variant='outline'
                    disabled={readOnly || limitReached}
                    onClick={() => actions.addGroup(group.id)}>
                    <Plus className='mr-2 size-4' />
                    Group
                </Button>
                <Button
                    type='button'
                    size='sm'
                    variant='outline'
                    disabled={readOnly || limitReached}
                    onClick={() => actions.addIf(group.id)}>
                    <Plus className='mr-2 size-4' />
                    IF / THEN / ELSE
                </Button>
                {limitReached && (
                    <p className='text-xs text-muted-foreground'>NOT groups can only contain a single condition.</p>
                )}
            </div>
        </div>
    );
};

export default GroupEditor;
