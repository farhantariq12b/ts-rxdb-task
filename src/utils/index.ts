
function generateInitials(name: string) {
  if (!name) {
    return ''
  }

  const words = name.split(' ');

  if (words.length < 2) {
    return name.slice(0, 2).toUpperCase();
  }

  const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase());

  const result = initials.join('');

  return result;
}


export {
  generateInitials
}
