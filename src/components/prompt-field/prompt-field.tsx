import React, { useState } from 'react';
import { LegacyLiveChatOutlineIcon } from '@deriv/quill-icons';
import { InputGroupButton } from '@deriv-com/quill-ui';
import { useGenerateStrategy } from './useGenerateStrategy';
import './prompt-field.scss';

export const PromptField: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const { request, isLoading } = useGenerateStrategy();

    const handleGenerate = async () => {
        if (!inputValue.trim()) return;
        await request(inputValue);
    };

    return (
        <div className='prompt-field-wrapper'>
            <InputGroupButton
                buttonLabel='Generate'
                button_position='right'
                disabled={isLoading}
                inputSize='md'
                leftIcon={<LegacyLiveChatOutlineIcon fill='#000000' iconSize='xs' />}
                message=''
                placeholder='What parameters do you need for strategy?'
                status='neutral'
                type='text'
                variant='fill'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                buttonCallback={handleGenerate}
            />
        </div>
    );
};
