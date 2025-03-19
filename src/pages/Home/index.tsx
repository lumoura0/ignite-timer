import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownButton, TaskInput, MinutesAmountInput } from './styles';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
})

export function Home() {
    const { register, handleSubmit, watch } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
    })

    function handleCreateNewCicle(data: any) {
        // TODO: Create new cicle with the form data
        console.log(data)
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCicle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder='Dê um nome para o seu projeto'
                        list='task-suggestions'
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
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}