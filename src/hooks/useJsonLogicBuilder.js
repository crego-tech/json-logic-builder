import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import {
    BRANCH_MODES,
    DEFAULT_RESULT_VALUE,
    NODE_TYPES,
} from '../constants';

const isObject = (value) => typeof value === 'object' && value !== null;

const deepClone = (value) => {
    if (typeof structuredClone === 'function') {
        return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));
};

const safeStringify = (value) => {
    try {
        return JSON.stringify(value);
    } catch (_error) {
        return null;
    }
};

const createRuleNode = (overrides = {}) => ({
    id: uuid(),
    type: NODE_TYPES.RULE,
    field: '',
    operator: '==',
    valueSource: 'value',
    value: '',
    ...overrides,
});

const createGroupNode = (overrides = {}) => ({
    id: uuid(),
    type: NODE_TYPES.GROUP,
    combinator: 'and',
    children: [],
    ...overrides,
});

const createResultNode = (value = DEFAULT_RESULT_VALUE) => ({
    id: uuid(),
    type: NODE_TYPES.RESULT,
    value,
});

const createBranchNode = (mode = BRANCH_MODES.RULES, overrides = {}) => ({
    id: overrides.id ?? uuid(),
    mode: overrides.mode ?? mode,
    group:
        overrides.group ||
        createGroupNode({
            children: [createRuleNode()],
        }),
    value: overrides.value ?? DEFAULT_RESULT_VALUE,
});

const createIfNode = (overrides = {}) => ({
    id: uuid(),
    type: NODE_TYPES.IF,
    condition: createGroupNode({
        children: [createRuleNode()],
    }),
    then: createBranchNode(),
    else: createBranchNode(BRANCH_MODES.VALUE, { value: 'DECLINE' }),
    ...overrides,
});

const ensureGroupChild = (group) => {
    if (!group.children.length) {
        group.children.push(createRuleNode());
    }
};

const normalizeRootGroup = (node) => {
    if (!node) {
        return createGroupNode({
            children: [createRuleNode()],
        });
    }

    if (node.type === NODE_TYPES.GROUP) {
        ensureGroupChild(node);
        return node;
    }

    return createGroupNode({
        children: [node],
    });
};

const extractVarName = (value) => {
    if (!isObject(value)) {
        return null;
    }

    if (Array.isArray(value.var)) {
        return value.var[0] ?? null;
    }

    return value.var ?? null;
};

const parseRuleNode = (operator, operands = []) => {
    const field = extractVarName(operands[0]) ?? '';
    const valueOperand = operands[1];

    if (!field && !valueOperand) {
        return null;
    }

    if (isObject(valueOperand) && Object.prototype.hasOwnProperty.call(valueOperand, 'var')) {
        return createRuleNode({
            field,
            operator,
            valueSource: 'field',
            value: extractVarName(valueOperand) ?? '',
        });
    }

    return createRuleNode({
        field,
        operator,
        valueSource: 'value',
        value: valueOperand ?? '',
    });
};

const parseGroupNode = (operator, children = []) => {
    const mappedChildren = children
        .map((child) => parseLogicNode(child))
        .filter(Boolean);

    return createGroupNode({
        combinator: operator === '!' ? 'not' : operator,
        children: mappedChildren,
    });
};

const parseBranch = (value) => {
    if (isObject(value)) {
        const parsed = parseLogicNode(value);

        if (parsed?.type === NODE_TYPES.GROUP) {
            ensureGroupChild(parsed);

            return createBranchNode(BRANCH_MODES.RULES, { group: parsed });
        }

        if (parsed?.type === NODE_TYPES.IF) {
            return createBranchNode(BRANCH_MODES.RULES, {
                group: createGroupNode({
                    children: [parsed],
                }),
            });
        }
    }

    return createBranchNode(BRANCH_MODES.VALUE, {
        value:
            value === undefined || value === null
                ? DEFAULT_RESULT_VALUE
                : value,
    });
};

function parseLogicNode(logic) {
    if (logic === undefined || logic === null) {
        return null;
    }

    if (!isObject(logic)) {
        return createResultNode(logic);
    }

    if (Array.isArray(logic)) {
        return createResultNode(logic);
    }

    if (Object.prototype.hasOwnProperty.call(logic, 'if')) {
        const [condition, onTrue, onFalse] = logic.if ?? [];

        return createIfNode({
            condition: normalizeRootGroup(parseLogicNode(condition)),
            then: parseBranch(onTrue),
            else: parseBranch(onFalse),
        });
    }

    const operator = Object.keys(logic)[0];

    if (!operator) {
        return null;
    }

    if (['and', 'or', '!'].includes(operator)) {
        return parseGroupNode(operator, logic[operator]);
    }

    return parseRuleNode(operator, logic[operator]);
}

const coerceLiteralValue = (value) => {
    if (typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }

    if (value === 'true') {
        return true;
    }

    if (value === 'false') {
        return false;
    }

    if (value === '' || value === null || value === undefined) {
        return '';
    }

    const numeric = Number(value);

    if (!Number.isNaN(numeric) && value !== '') {
        return numeric;
    }

    return value;
};

const nodeToLogic = (node) => {
    if (!node) {
        return true;
    }

    if (node.type === NODE_TYPES.RULE) {
        if (!node.field || !node.operator) {
            return true;
        }

        const leftOperand = { var: node.field };
        const rightOperand =
            node.valueSource === 'field'
                ? { var: node.value }
                : coerceLiteralValue(node.value);

        return {
            [node.operator]: [leftOperand, rightOperand],
        };
    }

    if (node.type === NODE_TYPES.RESULT) {
        return coerceLiteralValue(node.value);
    }

    if (node.type === NODE_TYPES.GROUP) {
        if (!node.children.length) {
            return true;
        }

        if (node.combinator === 'not') {
            return {
                '!': [nodeToLogic(node.children[0])],
            };
        }

        return {
            [node.combinator]: node.children.map((child) => nodeToLogic(child)),
        };
    }

    if (node.type === NODE_TYPES.IF) {
        return {
            if: [
                nodeToLogic(node.condition),
                branchToLogic(node.then),
                branchToLogic(node.else),
            ],
        };
    }

    return true;
};

const branchToLogic = (branch) => {
    if (branch.mode === BRANCH_MODES.RULES) {
        return nodeToLogic(branch.group);
    }

    return coerceLiteralValue(branch.value);
};

const collectStats = (node, totals) => {
    if (!node) {
        return;
    }

    if (node.type === NODE_TYPES.RULE) {
        totals.rules += 1;
    }

    if (node.type === NODE_TYPES.RESULT) {
        totals.results += 1;
    }

    if (node.type === NODE_TYPES.GROUP) {
        totals.groups += 1;
        node.children.forEach((child) => collectStats(child, totals));
    }

    if (node.type === NODE_TYPES.IF) {
        totals.conditions += 1;
        collectStats(node.condition, totals);

        if (node.then.mode === BRANCH_MODES.RULES) {
            collectStats(node.then.group, totals);
        } else {
            totals.results += 1;
        }

        if (node.else.mode === BRANCH_MODES.RULES) {
            collectStats(node.else.group, totals);
        } else {
            totals.results += 1;
        }
    }
};

const findNodeById = (node, id) => {
    if (!node) {
        return null;
    }

    if (node.id === id) {
        return node;
    }

    if (node.type === NODE_TYPES.GROUP) {
        for (const child of node.children) {
            const match = findNodeById(child, id);

            if (match) {
                return match;
            }
        }
    }

    if (node.type === NODE_TYPES.IF) {
        const conditionMatch = findNodeById(node.condition, id);

        if (conditionMatch) {
            return conditionMatch;
        }

        if (node.then.mode === BRANCH_MODES.RULES) {
            const match = findNodeById(node.then.group, id);

            if (match) {
                return match;
            }
        } else if (node.then.id === id) {
            return node.then;
        }

        if (node.else.mode === BRANCH_MODES.RULES) {
            const match = findNodeById(node.else.group, id);

            if (match) {
                return match;
            }
        } else if (node.else.id === id) {
            return node.else;
        }
    }

    return null;
};

const findParentGroup = (node, childId) => {
    if (!node || node.type !== NODE_TYPES.GROUP) {
        if (node?.type === NODE_TYPES.IF) {
            return (
                findParentGroup(node.condition, childId) ||
                (node.then.mode === BRANCH_MODES.RULES &&
                    findParentGroup(node.then.group, childId)) ||
                (node.else.mode === BRANCH_MODES.RULES &&
                    findParentGroup(node.else.group, childId))
            );
        }

        return null;
    }

    const index = node.children.findIndex((child) => child.id === childId);

    if (index !== -1) {
        return { group: node, index };
    }

    for (const child of node.children) {
        if (child.type === NODE_TYPES.GROUP || child.type === NODE_TYPES.IF) {
            const result = findParentGroup(child, childId);

            if (result) {
                return result;
            }
        }
    }

    return null;
};

const useJsonLogicBuilder = ({ rule, onChange }) => {
    const [rootGroup, setRootGroup] = useState(() =>
        normalizeRootGroup(parseLogicNode(rule))
    );
    const lastSerializedRule = useRef(safeStringify(nodeToLogic(rootGroup)));

    const syncFromExternalRule = useCallback(
        (incomingRule) => {
            const serialized = safeStringify(incomingRule);

            if (!serialized || serialized === lastSerializedRule.current) {
                return;
            }

            lastSerializedRule.current = serialized;
            setRootGroup(normalizeRootGroup(parseLogicNode(incomingRule)));
        },
        []
    );

    // Synchronize builder state whenever the consumer provides a new rule snapshot.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        syncFromExternalRule(rule);
    }, [rule, syncFromExternalRule]);

    useEffect(() => {
        const jsonRule = nodeToLogic(rootGroup);
        lastSerializedRule.current = safeStringify(jsonRule);
        onChange?.(jsonRule);
    }, [rootGroup, onChange]);

    const mutateTree = useCallback((updater) => {
        setRootGroup((current) => {
            const draft = deepClone(current);
            const changed = updater(draft);

            if (changed === false) {
                return current;
            }

            return draft;
        });
    }, []);

const addRule = useCallback(
    (groupId, overrides = {}) => {
            mutateTree((draft) => {
                const group = findNodeById(draft, groupId);

                if (!group || group.type !== NODE_TYPES.GROUP) {
                    return false;
                }

                if (group.combinator === 'not' && group.children.length >= 1) {
                    return false;
                }

            group.children.push(createRuleNode(overrides));
            });
        },
        [mutateTree]
    );

    const addGroup = useCallback(
        (groupId) => {
            mutateTree((draft) => {
                const group = findNodeById(draft, groupId);

                if (!group || group.type !== NODE_TYPES.GROUP) {
                    return false;
                }

                if (group.combinator === 'not' && group.children.length >= 1) {
                    return false;
                }

                group.children.push(
                    createGroupNode({
                        children: [createRuleNode()],
                    })
                );
            });
        },
        [mutateTree]
    );

    const addIf = useCallback(
        (groupId) => {
            mutateTree((draft) => {
                const group = findNodeById(draft, groupId);

                if (!group || group.type !== NODE_TYPES.GROUP) {
                    return false;
                }

                if (group.combinator === 'not' && group.children.length >= 1) {
                    return false;
                }

                group.children.push(createIfNode());
            });
        },
        [mutateTree]
    );

    const removeNode = useCallback(
        (nodeId) => {
            mutateTree((draft) => {
                if (draft.id === nodeId) {
                    return false;
                }

                const parentInfo = findParentGroup(draft, nodeId);

                if (!parentInfo) {
                    return false;
                }

                parentInfo.group.children.splice(parentInfo.index, 1);

                ensureGroupChild(parentInfo.group);
            });
        },
        [mutateTree]
    );

    const updateRule = useCallback(
        (ruleId, updates) => {
            mutateTree((draft) => {
                const node = findNodeById(draft, ruleId);

                if (!node || node.type !== NODE_TYPES.RULE) {
                    return false;
                }

                Object.assign(node, updates);
            });
        },
        [mutateTree]
    );

    const updateGroup = useCallback(
        (groupId, updates) => {
            mutateTree((draft) => {
                const node = findNodeById(draft, groupId);

                if (!node || node.type !== NODE_TYPES.GROUP) {
                    return false;
                }

                Object.assign(node, updates);

                if (node.combinator === 'not' && node.children.length > 1) {
                    node.children = node.children.slice(0, 1);
                }
            });
        },
        [mutateTree]
    );

    const updateResultNode = useCallback(
        (nodeId, value) => {
            mutateTree((draft) => {
                const node = findNodeById(draft, nodeId);

                if (!node || node.type !== NODE_TYPES.RESULT) {
                    return false;
                }

                node.value = value;
            });
        },
        [mutateTree]
    );

    const withBranch = useCallback((ifId, branchKey, callback) => {
        mutateTree((draft) => {
            const ifNode = findNodeById(draft, ifId);

            if (!ifNode || ifNode.type !== NODE_TYPES.IF) {
                return false;
            }

            const branch = ifNode[branchKey];

            callback(branch);

            if (branch.mode === BRANCH_MODES.RULES) {
                ensureGroupChild(branch.group);
            }
        });
    }, [mutateTree]);

    const updateBranchMode = useCallback(
        (ifId, branchKey, mode) => {
            withBranch(ifId, branchKey, (branch) => {
                branch.mode = mode;

                if (mode === BRANCH_MODES.RULES) {
                    branch.group =
                        branch.group ||
                        createGroupNode({
                            children: [createRuleNode()],
                        });
                }
            });
        },
        [withBranch]
    );

    const updateBranchValue = useCallback(
        (ifId, branchKey, value) => {
            withBranch(ifId, branchKey, (branch) => {
                branch.value = value;
            });
        },
        [withBranch]
    );

    const reorderWithinGroup = useCallback(
        (groupId, fromIndex, toIndex) => {
            if (fromIndex === toIndex) {
                return;
            }

            mutateTree((draft) => {
                const group = findNodeById(draft, groupId);

                if (!group || group.type !== NODE_TYPES.GROUP) {
                    return false;
                }

                group.children = arrayMove(group.children, fromIndex, toIndex);
            });
        },
        [mutateTree]
    );

    const moveNodeToGroup = useCallback(
        (nodeId, targetGroupId, targetIndex = null) => {
            if (nodeId === targetGroupId) {
                return;
            }

            mutateTree((draft) => {
                const parentInfo = findParentGroup(draft, nodeId);
                const targetGroup = findNodeById(draft, targetGroupId);

                if (!parentInfo || !targetGroup || targetGroup.type !== NODE_TYPES.GROUP) {
                    return false;
                }

                const [node] = parentInfo.group.children.splice(parentInfo.index, 1);

                const insertionIndex =
                    typeof targetIndex === 'number'
                        ? targetIndex
                        : targetGroup.children.length;

                targetGroup.children.splice(insertionIndex, 0, node);

                ensureGroupChild(parentInfo.group);
            });
        },
        [mutateTree]
    );

    const stats = useMemo(() => {
        const totals = {
            rules: 0,
            groups: 0,
            conditions: 0,
            results: 0,
        };

        collectStats(rootGroup, totals);

        return {
            ...totals,
            total: totals.rules + totals.groups + totals.conditions,
        };
    }, [rootGroup]);

    return {
        rootGroup,
        nodeTypes: NODE_TYPES,
        branchModes: BRANCH_MODES,
        getNodeById: (id) => findNodeById(rootGroup, id),
        actions: {
            addRule,
            addGroup,
            addIf,
            removeNode,
            updateRule,
            updateGroup,
            updateResultNode,
            updateBranchMode,
            updateBranchValue,
            reorderWithinGroup,
            moveNodeToGroup,
        },
        stats,
    };
};

export default useJsonLogicBuilder;

