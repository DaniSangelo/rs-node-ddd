import { UniqueEntityID } from './unique-entity-id'

export class Entity<T> {
  #id: UniqueEntityID
  protected props: T

  get id() {
    return this.#id
  }

  protected constructor(props: any, id?: UniqueEntityID) {
    this.props = props
    this.#id = id ?? new UniqueEntityID(id)
  }
}
