import { read } from 'xlsx';

function extractDate(date) {
  let [month, day, year] = date.split('/');

  day = day.length === 1 ? `0${day}` : day;
  month = month.length === 1 ? `0${month}` : month;

  return `${day}${month}19${year}`
}

export default async function convert(file) {
  const buffer = await file.arrayBuffer();
  const sheetFile = read(buffer);
  const sheet = Object.values(sheetFile.Sheets)[0];

  let i = 2;
  let csv = 'Assuré : numéro de Sécurité Sociale;Identité patient : Date de naissance;Identité patient : Sexe;Numéro IPP;NOM;PRENOM';
  while (sheet[`A${i}`]) {
    const name = sheet[`A${i}`].w;
    const firstName = sheet[`B${i}`].w;
    let birthDate = sheet[`C${i}`].w;
    const ipp = sheet[`D${i}`].w;
    let sex = sheet[`G${i}`].w;
    let id = sheet[`H${i}`].w;
  
    id = id.replace(/ /g, '');
    birthDate = extractDate(birthDate);
    sex = sex === 'M' ? 1 : 2;
    csv += `\n${id};${birthDate};${sex};${ipp};${name};${firstName}`;
  
    i += 1;
  }

  return csv;
}
