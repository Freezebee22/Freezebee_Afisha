export const getFakeStripeToken = (cardNumber: string, cardOwner: string, cardCode: string): string => {
    const token = "fake_" + Math.random().toString(36).slice(2);
    localStorage.setItem("card_token", token);
    localStorage.setItem(token, JSON.stringify({
        number: cardNumber,
        owner: cardOwner,
        code: cardCode
    }));
    return token;
};

export const fetchDecryptedCardInfo = (token: string) => {
    if (!token.startsWith("fake_")) return null;
    const raw = localStorage.getItem(token);
    if (!raw) return null;
    const { number, owner } = JSON.parse(raw);
    return {
        masked: "•••• •••• •••• " + number.slice(-4),
        owner
    };
};

export const removeFakeToken = () => {
    console.log("meow");
    localStorage.clear();
}
