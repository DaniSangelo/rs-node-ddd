import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository,
  )
  const { question } = await createQuestionUseCase.execute({
    content: 'conteúdo questão',
    authorId: '1',
    title: 'Nova questão',
  })
  expect(question.id).toBeTruthy()
})
