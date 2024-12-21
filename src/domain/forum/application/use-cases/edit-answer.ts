import { Either, left, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
  attachmentsIds?: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRespository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    if (attachmentsIds) {
      const currentAttachments =
        await this.answerAttachmentsRespository.findManyByAnswerId(answerId)

      const attachmentList = new AnswerAttachmentList(currentAttachments)

      const answerAttachments = attachmentsIds.map((attachmentId) => {
        return AnswerAttachment.create({
          attachmentId: new UniqueEntityID(attachmentId),
          answerId: answer.id,
        })
      })

      attachmentList.update(answerAttachments)
      answer.attachments = attachmentList
    }

    answer.content = content

    await this.answersRepository.save(answer)
    return right({ answer })
  }
}
