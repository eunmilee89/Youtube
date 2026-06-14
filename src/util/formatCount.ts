export function formatCount(countStr: string | undefined): string {
  const count = Number(countStr);

  if (!countStr || isNaN(count) || count === 0) return "";

  if (count >= 10000) {
    const tenThousand = count / 10000;
    return `${parseFloat(tenThousand.toFixed(1))}만`;
  }

  if (count >= 1000) {
    const thousand = count / 1000;
    return `${parseFloat(thousand.toFixed(1))}천`;
  }

  console.log(count);

  return `${count}`;
}
