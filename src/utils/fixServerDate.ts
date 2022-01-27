export const fixServerDate = (date: string) =>
  `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
