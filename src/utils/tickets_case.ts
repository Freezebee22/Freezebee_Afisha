export const ticketsCase = (count: number) => {
    if (count === 1) {
        return `билетов`;
    }
    if (count < 5) {
        return `билета`;
    }
    return `билетов`;
}