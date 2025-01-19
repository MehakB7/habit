import React from 'react'
import { RadioButtonProps } from './type'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const RadioButton = ({options, onValueChange, defaultValue, className}:RadioButtonProps) => {
  return (
    <RadioGroup
    onValueChange={onValueChange}
    defaultValue={defaultValue}
    className={className}
  >
    {
        options.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
                <RadioGroupItem value={option.value} />
                <Label>{option.label}</Label>
            </div>
        ))
    }
   
  </RadioGroup>
  )
}

export default RadioButton