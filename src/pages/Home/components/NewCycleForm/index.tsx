import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

import * as zod from 'zod'
import { useForm } from 'react-hook-form'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1).max(60),
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder='Dê um nome para o seu projeto'
                list='task-suggestions'
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id='task-suggestions'>
                <option value="Projeto 1" />
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder='00'
                disabled={!!activeCycle}
                step={5}
                min={1}
                max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}