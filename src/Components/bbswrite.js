import axios from "axios";
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './bbs.css';

function Bbswrite(){

    let history = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("login") === null){
            alert('로그인한 사용자만 게시글을 작성할 수 있습니다!');
            history('/login');
        }
    })

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const titleChange = (e) => {setTitle(e.target.value)}
    const contentChange = (e) => {setContent(e.target.value)}
    

    const writeBtn = () => {
        sendData(localStorage.getItem("login"), title, content);
    }

    const sendData = async (i, t, c) => {
        await axios.get("http://localhost:3000/writeBbs", {params:{"id":i, "title":t, "content":c}})
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
                <h2>글쓰기</h2>
                <table className="table">
                    <tr>
                        <th>작성자</th>
                        <td>
                            <input type="text" className="form-control" value={localStorage.getItem("login")} readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input type="text" className="form-control" onChange={titleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea className="form-control" rows="10" onChange={contentChange}/>
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <button type="button" className="btn btn-primary" onClick={writeBtn}>등록</button>
                            <Link className="btn btn-primary" to='/bbslist'>취소</Link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Bbswrite;