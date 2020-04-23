export class CommandResult {
  constructor(
    public readonly success: boolean,
    public readonly error?: string
  ) {}
}
