export class DuplicatedShortcode extends Error {
  constructor() {
    super('Shortcode already exists')
  }
}
