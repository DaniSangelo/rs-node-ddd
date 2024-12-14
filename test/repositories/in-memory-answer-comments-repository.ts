import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(question: any) {
    this.items.push(question)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async delete(answer: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(index, 1)
  }
}
