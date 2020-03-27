class RandomDeck<T> {
  cards: Array<T> = [];
  length() {
    return this.cards.length;
  }
  [Symbol.iterator]() {
    let getRange = (n: number) => Array.from(new Array(n), (_, i) => i); // [0, n)
    let shuffle = (arr: any[]) => { // Durstenfeld shuffle
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    let i = 0;
    let indices = shuffle(getRange(this.length()));

    return {
      next: () => {
        return {
          value: this.cards[indices[i++]],
          done: i > this.length()
        }
      }
    }
  }
}

export default RandomDeck;