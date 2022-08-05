import axios from "axios";
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import Pagination from 'react-js-pagination';

import './bbslist.css';
import './page.css';

function Bbslist(){
    const [bbslist, setBbslist] = useState([]);

    //검색용
    const [choiceValue, setChoiceValue] = useState("");
    const [searchValue, setSearchValue] = useState("");

    //paging
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    //link용 함수
    let history = useNavigate();

    const fetchData = async (c, s, p) => {
        await axios.get("http://localhost:3000/getBbsReactList", {params:{"choice":c, "search":s, "pageNumber":(p-1)}})
            .then(function(resp){
                //console.log(resp.data);
                setBbslist(resp.data.bbslist);

                setTotalCnt(resp.data.cnt);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData('','', 1);
    }, []);

    const choiceChange = (e) => setChoiceValue(e.target.value);
    const searchChange = (e) => setSearchValue(e.target.value);
    const searchBtn = () => {

        history('/bbslist');

        fetchData(choiceValue, searchValue, 1);
    }

    const handlePageChange = (page) => {
        setPage(page);
        fetchData(choiceValue, searchValue, page);
    }

    return (
        <div>

            {/* 검색 */}
            <table className="search">
                <tbody>
                <tr>
                    <td>
                        <select className="custom-select" onChange={choiceChange}>
                            <option>선택</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="writer">작성자</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" className="form-control" placeholder="검색어" value={searchValue} onChange={searchChange}></input>
                    </td>
                    <td>
                        <button type="button" className="btn btn-primary" onClick={searchBtn}>검색</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <Link className="btn btn-primary float-right writeBtn" to='/bbswrite'>글쓰기</Link>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>num</th>
                        <th>title</th>
                        <th>id</th>
                    </tr>
                </thead>
                <tbody>
                {
                    bbslist.map(function(object, i){
                        return (
                            <TableRow obj={object} key={i} cnt={i+1}/>
                        )
                    })
                }
                </tbody>
            </table>

            <Pagination activePage={page} itemsCountPerPage={10}
                        totalItemsCount={totalCnt}
                        pageRangeDisplayed={5}
                        prevPageText={'<'}
                        nextPageText={'>'}
                        onChange={handlePageChange}></Pagination>
        </div>
    )
}

function TableRow(props){
    return(
        <tr>
            <th>{props.cnt}</th>
            { delProc(props) }
            <td>{props.obj.id}</td>
        </tr>
    )
}

// 삭제된 글의 처리
function delProc(props){
    if(props.obj.del === 0){
        return(
            <td className="underline">
                {getArrow(props.obj.depth)}
                <Link to={{pathname:`/bbsdetail/${props.obj.seq}`}}>         
                    {titleDot3(props.obj.title)}
                </Link>
            </td> 
        )
    }else{
        return(
            <td>- 이 글은 작성자에 의해서 삭제되었습니다 -</td>
        )
    }
}

function getArrow( depth ) {
	let rs = "<img src='arrow.png' width='20px' height='20px'/>";
	let nbsp = "&nbsp;&nbsp;&nbsp;&nbsp";    
	
	let ts = "";
	for(let i = 0;i < depth; i++){
		ts += nbsp;
	}
    // String -> Html
    let s = <span dangerouslySetInnerHTML={ {__html: ts + rs + "&nbsp;&nbsp;"} }></span>

	return depth===0?"":s;    
}

function titleDot3( str ) {	
	let s = "";
	if(str.length > 50){
		s = str.substring(0, 50);
		s += "...";
	}else{
		s = str;	
	}	
	return s;
}

export default Bbslist;