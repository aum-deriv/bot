import { useState } from 'react';

declare global {
    interface Window {
        Blockly: {
            Xml: {
                textToDom(text: string): Element;
                domToWorkspace(dom: Element, workspace: any): void;
            };
            derivWorkspace: any;
        };
    }
}

interface UseGenerateStrategyReturn {
    request: (prompt: string) => Promise<void>;
    response: string | null;
    isLoading: boolean;
    error: string | null;
}

export const useGenerateStrategy = (): UseGenerateStrategyReturn => {
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = async (prompt: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('http://localhost:5000/generate_strategy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate strategy');
            }

            const { strategy } = await response.json();
            const xml = window.Blockly.Xml.textToDom(strategy);
            window.Blockly.Xml.domToWorkspace(xml, window.Blockly.derivWorkspace);
            setResponse(strategy);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate strategy');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        request,
        response,
        isLoading,
        error,
    };
};
