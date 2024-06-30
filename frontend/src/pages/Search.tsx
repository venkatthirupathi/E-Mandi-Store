import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  return <pre>{searchParams.toString()}</pre>;
}
