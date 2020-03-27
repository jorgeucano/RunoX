const fullDeck = createFullDeck();

const stack$ = fromEvent(_sentCard, 'click')
                .pipe(
                    filter(f => 
                        validNewCard(f)
                    ),
                    scan((stack, newCard) => {}, []),
                )


function validNewCard(f) {
    return f.color === lastColor ||
                        f.numero === lastNumber ||
                        multicolor
}

const newCard$ = fromEvent(_buttonNext, 'click')
              .pipe(
                map(v => {
                  return true;
                })
              );

const deck$ = combineLatest([newCard$])
                .pipe(
                    scan((deck, edit) => {
                      // check deck and reEdit 
                    }, fullDeck)
                )

const player1 = 
        deck$
          .pipe(
            filter(
              c =>
                
            ),
            take(1),
            repeat()
          );

player1.subscribe({
  next: (v) => {
    console.log('Jorge: ',v);
  }
})

// pushear nueva carta o enviar carta 
const hand = [];