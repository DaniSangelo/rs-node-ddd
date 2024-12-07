import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
    const answer = await answerQuestion.execute({
        content: 'Nova resposta',
        instructorId: '1',
        questionId: '1'
    })
    expect(answer.content).toEqual('Nova resposta')
})