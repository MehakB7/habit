import { z } from 'zod';

const schema1 = z
  .object({
    isMeasurable: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
    unit: z.string().optional(),
    target: z.number().optional(),
    targetType: z.enum(['At Most', 'At Least'], { required_error: 'Please select an option' }).optional(),
  })
  .superRefine((values, ctx) => {
    if (values.isMeasurable === 'yes' && !values.unit) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Unit is Required',
        path: ['unit'],
      })
    }
    if (values.isMeasurable === 'yes' && !values.target) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Target is Required',
        path: ['target'],
      })
    }
    if (values.isMeasurable === 'yes' && !values.targetType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Target type is Required',
        path: ['targetType'],
      })
    }
  })

const schema2 = z.object({
  name: z.string().nonempty('Habit name is required'),
  question: z.string(),
  isMeasurable: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
  color: z.string().nonempty(),
})
export const schema = z.intersection(schema1, schema2)