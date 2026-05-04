import { useSearchParams } from "react-router";
import SearchResult from "../components/SearchResult";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");
  if (!query) return <div>검색어를 입력해주세요</div>;

  return <SearchResult query={query} />;
}
