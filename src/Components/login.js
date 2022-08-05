import axios from "axios";
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import './login.css';

function Login(){

    let history = useNavigate();

    const [idValue, setIdValue] = useState("");
    const [pwValue, setPwValue] = useState("");

    const idChange = (e) => setIdValue(e.target.value);
    const pwChange = (e) => setPwValue(e.target.value);

    const loginBtn = () => {
        sendData(idValue, pwValue)
    }

    const sendData = async (id, pw) => {
        await axios.post('http://localhost:3000/login', null, {params:{"id":id, "pwd":pw}})
        .then(function(resp){
            //console.log(resp.data);
            if(resp.data === ""){
                alert('일치하는 아이디/비밀번호가 없습니다.');
            }
            else{
                localStorage.setItem("login", resp.data.id);
                document.location.href = '/';
                history('/');
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const cancelBtn = () => {
        history('/');
    }

    return (
        <div>
            <div className="loginBox">
                <h2>로그인</h2>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <input type="text" className="form-control" placeholder="아이디" onChange={idChange}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <input type="text" className="form-control" placeholder="비밀번호" onChange={pwChange}></input>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary" onClick={loginBtn}>로그인</button>
                <button type="button" className="btn btn-light" onClick={cancelBtn}>취소</button>
                
                <div className="float-right">
                    아직 회원이 아니신가요? <Link className="btn btn-light" to='/register'>회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;