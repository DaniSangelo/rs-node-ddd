import { randomUUID } from "node:crypto"
import { UniqueEntityID } from "./unique-entity-id"

export class Entity<T> {
    #id: UniqueEntityID
    protected props: T

    get id() {
        return this.#id
    }

    constructor(props: any, id?: string) {
        this.props = props
        this.#id = new UniqueEntityID(id)
    }
}