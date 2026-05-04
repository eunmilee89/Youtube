interface Props {
  query: string;
}

export default function SearchResult({ query }: Props) {
  return <div>SearchResult {query}</div>;
}
