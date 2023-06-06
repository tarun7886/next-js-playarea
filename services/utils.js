export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateRoomId(){
  const letter = ["able","acid","airy","area","army","baby","back","ball","band","base","bear","beam","bell","best","bird","bit","box","boy","case","cash","coat","cool","core","cost","data","day","deep","desk","dog","door","fast","fact","fall","fish","fit","four","game","girl","goal","gold","hand","hat","head","heat","home","hope","hour"]
  return letter[Math.floor(Math.random()*letter.length)]
}

export function isMobileBrowser() {
  return /Mobi/i.test(navigator.userAgent);
}
