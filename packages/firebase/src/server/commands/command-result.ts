/**
 * Class to use as command validation result
 */
export class CommandValidation {
  /**
   * Class to use as command validation result
   *
   * @param isValid - true if the command can be executed, false if not
   * @param error - error message. If isValid is true this field should be undefined
   */
  constructor(
    public readonly isValid: boolean,
    public readonly error?: string
  ) {}
}
