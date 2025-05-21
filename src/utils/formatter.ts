export const formatPhone = (input: string): string => {
    const digits = input.replace(/\D/g, "");
    
    const match = digits.match(/^7?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return "+7";

    const [, code, part1, part2, part3] = match;

    let result = "+7";
    if (code) result += ` (${code}`;
    if (code && part1) result += ")";
    if (part1) result += ` ${part1}`;
    if (part2) result += `-${part2}`;
    if (part3) result += `-${part3}`;

    return result;
};

export const formatCardNumber = (value: string): string => {
    return value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
};
