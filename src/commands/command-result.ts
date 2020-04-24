export class CommandValidation {
  constructor(
    public readonly isValid: boolean,
    public readonly error?: string
  ) {}
}
