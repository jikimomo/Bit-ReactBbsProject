import axios from "axios";
import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import './bbs.css';

function Bbsdetail(){
    
    let history = useNavigate();

    /* 로그인 여부 */
    const [loginValue, setloginValue] = useState("");

    useEffect(()=>{
        setloginValue(localStorage.getItem("login"));
    })

    const params = useParams();

    /* 게시물 */
    const [detail, setDetail] = useState('');

    const fetchData = async (s) => {
        await axios.get("http://localhost:3000/getBbs", {params:{"seq":s, "id":localStorage.getItem("login")}})
            .then(function(resp){
                setDetail(resp.data);
            })
            .catch(function(error){
                console.log(error);
            })
    }


    const deleteBtn = () => {
        deleteData(params.seq);
    }

    const deleteData = async (s) => {
        await axios.get("http://localhost:3000/deleteBbs", {params:{"seq":s}})
        .then(function(resp){
            console.log(resp.data);
            history('/bbslist');
        })
        .catch(function(error){
            console.log(error);
        })
    }

    /* 댓글 */
    const [comment, setComment] = useState('');

    const commentChange = (e) => {setComment(e.target.value)}

    const commentBtn = () => {
        sendComment(params.seq, loginValue, comment);
    }

    const sendComment = async (s, ci, c) => {
        await axios.get("http://localhost:3000/writeCmt", {params:{"bbsSeq":s, "id":ci, "comment":c}})
        .then(function(resp){
            console.log(resp.data);
            window.location.replace(`/bbsdetail/${params.seq}`);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const [cmtlist, setCmtlist] = useState([]);

    const fetchCmt = async (s) => {
        await axios.get("http://localhost:3000/getCmtList", {params:{"bbsSeq":s}})
            .then(function(resp){
                //console.log(resp.data);
                setCmtlist(resp.data);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData(params.seq);
        fetchCmt(params.seq);
    }, []);

    return (
        <div>
            <div className="detailBox">
                <h2>상세페이지</h2>
                <table className="table detailTable">
                    <tbody>
                    {loginValue === detail.id
                    ?
                    <tr>
                        <th></th>
                        <td>
                            <button type="button" className="btn btn-danger float-right" onClick={deleteBtn}>삭제</button>
                            <Link className="btn btn-primary float-right" to={{pathname:`/bbsupdate/${params.seq}`}}>수정</Link>
                        </td>
                    </tr>
                    :<span></span>
                    }
                    <tr>
                        <th>작성자</th>
                        <td>
                            {detail.id}
                        </td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>
                            {detail.wdate}
                        </td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>
                            {detail.readcount}
                        </td>	
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            {detail.title}
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                        <textarea className="form-control" rows="10" value={detail.content} readOnly/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="cmtListBox">
                <h4>댓글</h4>
                <table className="table cmtTable">
                    <tbody>
                    {
                        cmtlist.map(function(object, i){
                            return (
                                <TableRow obj={object} key={i} cnt={i+1}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

            {loginValue === null
            ?<span></span>
            :
            <div className="cmtWriteBox">
                <h4>댓글달기</h4>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>작성자</th>
                        <td>
                        <input type="text" className="form-control" value={loginValue} readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                        <textarea className="form-control" cols="20" rows="3" onChange={commentChange} />      
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                        <button type="button" className="btn btn-primary" onClick={commentBtn}>댓글달기</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            }

            <div className="my-5 d-flex justify-content-center">
                <Link className="btn btn-primary" to='/bbslist'>글목록</Link>
            </div>
        </div>
    )
}

function TableRow(props){
    return(
        <div className="cmtBox">
            <tr>
                <th>작성자</th>
                <td>
                    {props.obj.id}
                </td>
            </tr>
            <tr>
                <th></th>
                <td>{props.obj.comment}</td>
            </tr>
        </div>
    )
}

export default Bbsdetail;