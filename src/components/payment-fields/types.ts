export type TPaymentFieldsProps = {
    cardNumber: string,
    setCardNumber: (e: React.ChangeEvent<HTMLInputElement>) => void,
    cardOwner: string,
    setCardOwner: (e: React.ChangeEvent<HTMLInputElement>) => void,
    cardCode: string,
    setCardCode: (e: React.ChangeEvent<HTMLInputElement>) => void,
};