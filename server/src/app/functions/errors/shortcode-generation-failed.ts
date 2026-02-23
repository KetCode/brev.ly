export class ShortcodeGenerationFailed extends Error {
  constructor() {
    super('Failed to generate a unique shortcode, please try again')
  }
}
