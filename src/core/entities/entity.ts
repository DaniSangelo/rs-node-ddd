import { randomUUID } from "node:crypto"

export class Entity<T> {
    #id: string
    protected props: T

    get id(): string {
        return this.#id
    }

    constructor(props: any, id?: string) {
        this.props = props
        this.#id = id ?? randomUUID()
    }
}