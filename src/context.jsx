import { createContext, useContext } from 'react';

const JsonLogicBuilderContext = createContext(null);

export const JsonLogicBuilderProvider = ({ value, children }) => (
    <JsonLogicBuilderContext.Provider value={value}>{children}</JsonLogicBuilderContext.Provider>
);

export const useJsonLogicBuilderContext = () => {
    const context = useContext(JsonLogicBuilderContext);

    if (!context) {
        throw new Error('useJsonLogicBuilderContext must be used inside JsonLogicBuilderProvider');
    }

    return context;
};
