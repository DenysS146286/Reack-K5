const UczestnikCard = ({ uczestnik, rozwiniety, onSelect }) => {
    if (!uczestnik) return null;
   
    const { id, imie, nazwisko, rola, numer, opis } = uczestnik;
    const jestNauczycielem = rola === "nauczyciel";
   
    return (
      <div
        className={jestNauczycielem ? "karta karta-nauczyciel" : "karta"}
        onClick={() => onSelect(id)}
      >
        <h3>{imie} {nazwisko}</h3>
        <p>Rola: {rola}</p>
   
        {rozwiniety && (
          <div className="szczegoly">
            <p>{jestNauczycielem ? "Nr legitymacji" : "Nr indeksu"}: {numer}</p>
            <p>Opis: {opis}</p>
          </div>
        )}
      </div>
    );
  };
   
  export default UczestnikCard;