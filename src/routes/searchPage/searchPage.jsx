import { useSearchParams } from 'react-router';
import Gallery from '../../components/gallery/gallery';
import './searchPage.css';

const SearchPage = () => {

    let [searchParams] = useSearchParams();

    const search = searchParams.get("search");
    const boardId = searchParams.get("boardId");

    return (
        <div className="searchPage">
            <Gallery search={search} boardId={boardId}/>
        </div>
    )
}

export default SearchPage