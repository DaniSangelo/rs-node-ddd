import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug use case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should get question by slug', async () => {
    const newQuestion = Question.create({
      title: 'New question',
      content: 'New question content',
      slug: Slug.create('new-question'),
      authorId: new UniqueEntityID(),
    })

    await inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({ slug: 'new-question' })
    expect(question.id).toBeTruthy()
  })
})
