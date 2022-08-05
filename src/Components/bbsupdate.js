import axios from "axios";
import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';

import './bbs.css';

function Bbsupdate(){

    const params = useParams();

    const fetchData = async (s) => {
        await axios.get("http://localhost:3000/getBbs", {params:{"seq":s}})
            .then(function(resp){
                setId(resp.data.id);
                setTitle(resp.data.title);
                setContent(resp.data.content);
            })
            .catch(function(error){
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData(params.seq);
    }, []);

    let history = useNavigate();

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const titleChange = (e) => {setTitle(e.target.value)}
    const contentChange = (e) => {setContent(e.target.value)}

    const updateBtn = () => {
        updateData(`${params.seq}`, id, title, content);
    }

    const updateData = async (s, i, t, c) => {
        await axios.get("http://localhost:3000/updateBbs", {params:{"seq":s, "id":i, "title":t, "content":c}})
        .then(function(resp){
            console.log(resp.data);
            history('/bbslist');
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return (
        <div>
            <div className="writeBox">
                <h2>글 수정하기</h2>
                <table className="table">
                    <tr>
                        <th>작성자</th>
                        <td>
                        <input type="text" className="form-control" value={id} readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                        <input type="text" className="form-control" onChange={titleChange} value={title}/>       
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                        <textarea className="form-control" rows="10" onChange={contentChange} value={content}/>
                        </td>
                    </tr>
                    <tr>
                        <th>
                        </th>
                        <td>
                        <button type="button" className="btn btn-primary" onClick={updateBtn}>수정</button>
                        <Link className="btn btn-primary" to={{pathname:`/bbsdetail/${params.seq}`}}>취소</Link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Bbsupdate;