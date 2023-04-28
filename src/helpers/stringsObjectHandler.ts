export function stringsObjectHandler<T extends { [key: string]: string }>(
  arg: T
): T {
  return arg;
}
