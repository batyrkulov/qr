export const Patterns = {
  password: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  onlyLetters: /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-А-Яа-я-\s]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_-\s]*$/
}
