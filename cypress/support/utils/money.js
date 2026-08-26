export const parseMonetaryValue = (rawValue, description) => {
	const numericText = String(rawValue).match(/\d[\d.,]*/)?.[0];
	expect(numericText, `${description} não encontrado`).to.exist;

	const lastComma = numericText.lastIndexOf(',');
	const lastDot = numericText.lastIndexOf('.');
	const normalizedText =
		lastComma > lastDot ? numericText.replace(/\./g, '').replace(',', '.') : numericText.replace(/,/g, '');

	return Number(normalizedText);
};
