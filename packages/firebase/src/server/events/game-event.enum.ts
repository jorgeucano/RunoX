/**
 * Events that happen during a game match
 */
export enum GameEvent {
  AFTER_GAME_START = "afterGameStart",
  AFTER_PLAY_CARD = "afterPlayCard",
  AFTER_TAKE_CARDS = "afterTakeCards",
  AFTER_YELL_UNO = "afterYellUno",
  BEFORE_TURN = "beforeTurn",
  GAME_END = "gameEnd",
  CHANGE_COLOR = "changeColor",
  REVERSE = "reverse",
  SKIP = "skip",
  ERROR = "error",
}
