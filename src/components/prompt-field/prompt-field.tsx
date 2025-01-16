import React, { useState } from 'react';
import { InputGroupButton, SectionMessage } from '@deriv-com/quill-ui';
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
            {!isLoading ? (
                <InputGroupButton
                    buttonLabel='Generate'
                    button_position='right'
                    disabled={isLoading}
                    inputSize='md'
                    leftIcon={
                        <img
                            style={{ width: '20px', height: '20px' }}
                            src='https://media.nngroup.com/media/editor/2024/09/16/figma_generate_sparkles_ai_icon.png'
                        />
                    }
                    message=''
                    placeholder='What parameters do you need for strategy?'
                    status='neutral'
                    type='text'
                    variant='fill'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    buttonCallback={handleGenerate}
                />
            ) : (
                <SectionMessage
                    className='prompt-field__loader'
                    icon={
                        <img
                            style={{ width: '20px', height: '20px' }}
                            src='https://media.nngroup.com/media/editor/2024/09/16/figma_generate_sparkles_ai_icon.png'
                        />
                    }
                    linkList={null}
                    message='Generating strategy'
                    size='sm'
                    title=''
                />
            )}
        </div>
    );
};
