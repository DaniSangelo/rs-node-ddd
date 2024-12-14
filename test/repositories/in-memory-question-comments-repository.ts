import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(question: any) {
    this.items.push(question)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async delete(question: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
  }
}
