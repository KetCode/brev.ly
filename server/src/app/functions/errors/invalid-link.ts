export class InvalidLink extends Error {
  constructor() {
    super('Link not found')
  }
}
